import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  GraduationCap,
  Mail,
  Search,
  UserRound,
  Users,
} from 'lucide-react';
import { StudentPeopleService } from '../../../api';
import { useStudentCourses } from '../../../hooks/useCourses';
import { useAuth } from '../../../hooks/useAuth';
import { Avatar } from '../components/atoms/Avatar';

const normalizeText = (value) => `${value ?? ''}`.toLowerCase().trim();

const uniqueBy = (list, getKey) => {
  const seen = new Set();
  return list.filter((item) => {
    const key = getKey(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const classroomKey = (course) => (
  course?.idAula ? `aula-${course.idAula}` : `${course?.grado || 'grado'}-${course?.seccion || 'seccion'}`
);

const classroomLabel = (item) => {
  const grado = item?.grado ? `${item.grado} grado` : 'Grado no definido';
  const seccion = item?.seccion ? `Seccion ${item.seccion}` : 'Seccion no definida';
  return `${grado} - ${seccion}`;
};

const buildTeachersFromEmbeddedCourses = (courses) => {
  const grouped = new Map();

  courses.forEach((course) => {
    if (!course.teacher) return;

    const teacher = course.teacher;
    const key = teacher.id || teacher.email || teacher.name || `course-${course.id}`;
    const current = grouped.get(key) || {
      id: teacher.id,
      uid: `teacher-${key}`,
      type: 'teacher',
      role: 'Profesor',
      name: teacher.name || 'Profesor',
      code: teacher.code || '',
      email: teacher.email || '',
      phone: teacher.phone || '',
      grado: course.grado,
      seccion: course.seccion,
      avatarUrl: teacher.avatarUrl || null,
      courses: [],
      raw: teacher,
    };

    current.courses.push({
      id: course.id,
      title: course.title,
      description: course.description,
    });
    grouped.set(key, current);
  });

  return Array.from(grouped.values());
};

const PeoplePage = () => {
  const { user } = useAuth();
  const { data: courses = [], isLoading: coursesLoading } = useStudentCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [selectedUid, setSelectedUid] = useState(null);

  const {
    data: profileClassrooms = [],
    isLoading: profileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ['student-people', 'profile-classrooms', user?.id],
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
    queryFn: () => StudentPeopleService.getStudentClassrooms(user.id),
  });

  const courseClassrooms = useMemo(() => uniqueBy(
    courses
      .filter((course) => course.idAula || course.grado || course.seccion)
      .map((course) => ({
        idAula: course.idAula,
        grado: course.grado,
        seccion: course.seccion,
        key: classroomKey(course),
      })),
    (classroom) => classroom.key
  ), [courses]);

  const classrooms = useMemo(() => (
    profileClassrooms.length > 0 ? profileClassrooms : courseClassrooms
  ), [courseClassrooms, profileClassrooms]);

  const classroomQueryKey = classrooms.map((item) => item.key).join('|');

  const {
    data: classroomProfiles = [],
    isLoading: peopleLoading,
    isError: peopleError,
  } = useQuery({
    queryKey: ['student-people', 'classroom-people', classroomQueryKey],
    enabled: classrooms.length > 0,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const responses = await Promise.all(
        classrooms
          .map((classroom) => (
            classroom.idAula
              ? StudentPeopleService.getPeopleByClassroom(classroom.idAula, classroom)
              : StudentPeopleService.getPeopleBySection(classroom.grado, classroom.seccion, classroom)
          ))
      );

      return responses;
    },
  });

  const classmates = useMemo(() => uniqueBy(
    classroomProfiles.flatMap((profile) => profile.students || [])
      .map((student) => ({ ...student, uid: `student-${student.id || student.email || student.name}` })),
    (student) => student.uid
  ), [classroomProfiles]);

  const teachersFromBackend = useMemo(() => uniqueBy(
    classroomProfiles.flatMap((profile) => profile.teachers || [])
      .map((teacher) => ({ ...teacher, uid: `teacher-${teacher.id || teacher.email || teacher.name}` })),
    (teacher) => teacher.uid
  ), [classroomProfiles]);

  const teachers = useMemo(() => {
    if (teachersFromBackend.length > 0) return teachersFromBackend;
    return buildTeachersFromEmbeddedCourses(courses);
  }, [courses, teachersFromBackend]);

  const classroomCourses = useMemo(() => {
    const backendCourses = classroomProfiles.flatMap((profile) => profile.courses || []);
    if (backendCourses.length > 0) {
      return uniqueBy(backendCourses, (course) => course.id_curso || course.id || course.nombre);
    }
    return uniqueBy(courses, (course) => course.id);
  }, [classroomProfiles, courses]);

  const people = useMemo(() => {
    const currentUserId = user?.id ? String(user.id) : null;
    const students = classmates.map((student) => ({
      ...student,
      isCurrentUser: currentUserId && String(student.id) === currentUserId,
    }));

    return [...students, ...teachers];
  }, [classmates, teachers, user?.id]);

  const filteredPeople = useMemo(() => {
    const term = normalizeText(searchTerm);

    return people.filter((person) => {
      const matchesType = activeType === 'all' || person.type === activeType;
      const searchable = [
        person.name,
        person.code,
        person.email,
        person.role,
        classroomLabel(person),
        ...(person.courses || []).map((course) => course.title),
      ];

      return matchesType && (!term || searchable.some((value) => normalizeText(value).includes(term)));
    });
  }, [activeType, people, searchTerm]);

  const selectedPerson = useMemo(
    () => filteredPeople.find((person) => person.uid === selectedUid) || filteredPeople[0] || null,
    [filteredPeople, selectedUid]
  );

  useEffect(() => {
    const selectedIsVisible = filteredPeople.some((person) => person.uid === selectedUid);

    if ((!selectedUid || !selectedIsVisible) && filteredPeople[0]?.uid) {
      setSelectedUid(filteredPeople[0].uid);
    }
  }, [filteredPeople, selectedUid]);

  const loading = coursesLoading || profileLoading || peopleLoading;
  const hasError = profileError || peopleError;

  const stats = [
    { label: 'Alumnos', value: classmates.length, icon: Users },
    { label: 'Profesores', value: teachers.length, icon: GraduationCap },
    { label: 'Cursos', value: classroomCourses.length, icon: BookOpen },
  ];

  return (
    <section className="space-y-4">
      <header className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-sky-700">Personas</div>
            <h1 className="mt-1 text-2xl font-semibold text-gray-900">Integrantes del aula</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Alumnos del mismo salon y profesores asignados a los cursos de ese grado y seccion.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600">
            {classrooms.length > 0 ? classrooms.map(classroomLabel).join(' | ') : 'Aula no asignada'}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                {React.createElement(Icon, { className: 'h-5 w-5' })}
              </div>
              <div>
                <div className="text-xl font-semibold text-gray-900">{value}</div>
                <div className="text-xs font-medium text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar por nombre, codigo, correo o curso"
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
                {[
                  { key: 'all', label: 'Todos' },
                  { key: 'student', label: 'Alumnos' },
                  { key: 'teacher', label: 'Profesores' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveType(item.key)}
                    className={`h-8 rounded-md px-3 text-sm font-medium ${
                      activeType === item.key
                        ? 'bg-white text-sky-700 shadow-sm'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="min-h-[500px]">
            {loading ? (
              <PeopleState title="Cargando personas" detail="Consultando alumnos y profesores del aula." />
            ) : hasError ? (
              <PeopleState title="No se pudo cargar la informacion" detail="Verifica el backend o intenta nuevamente." />
            ) : filteredPeople.length === 0 ? (
              <PeopleState title="Sin resultados" detail="No hay personas que coincidan con los filtros actuales." />
            ) : (
              <PeopleTable
                people={filteredPeople}
                selectedUid={selectedPerson?.uid}
                onSelect={setSelectedUid}
              />
            )}
          </div>
        </main>

        <PersonDetail person={selectedPerson} />
      </div>
    </section>
  );
};

const PeopleTable = ({ people, selectedUid, onSelect }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[760px] text-left">
      <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
        <tr>
          <th className="px-4 py-3">Nombre</th>
          <th className="px-4 py-3">Rol</th>
          <th className="px-4 py-3">Aula</th>
          <th className="px-4 py-3">Correo</th>
          <th className="px-4 py-3">Curso / codigo</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {people.map((person) => (
          <tr
            key={person.uid}
            onClick={() => onSelect(person.uid)}
            className={`cursor-pointer transition ${
              selectedUid === person.uid ? 'bg-sky-50' : 'hover:bg-gray-50'
            }`}
          >
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Avatar name={person.name} src={person.avatarUrl} size="md" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-gray-900">{person.name}</span>
                    {person.isCurrentUser && (
                      <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-700">Tu</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{person.code || 'Sin codigo'}</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-3">
              <RoleBadge type={person.type} />
            </td>
            <td className="px-4 py-3 text-sm text-gray-600">{classroomLabel(person)}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{person.email || 'No registrado'}</td>
            <td className="px-4 py-3 text-sm text-gray-600">
              {person.type === 'teacher'
                ? person.courses?.map((course) => course.title).join(', ') || 'Sin curso'
                : person.code || 'No registrado'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RoleBadge = ({ type }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
      type === 'teacher'
        ? 'bg-violet-50 text-violet-700'
        : 'bg-sky-50 text-sky-700'
    }`}
  >
    {type === 'teacher' ? 'Profesor' : 'Alumno'}
  </span>
);

const PeopleState = ({ title, detail }) => (
  <div className="flex min-h-[500px] flex-col items-center justify-center px-6 text-center">
    <Users className="mb-3 h-10 w-10 text-gray-300" />
    <h2 className="text-base font-semibold text-gray-800">{title}</h2>
    <p className="mt-1 text-sm text-gray-500">{detail}</p>
  </div>
);

const PersonDetail = ({ person }) => (
  <aside className="rounded-xl border border-gray-200 bg-white shadow-sm">
    {!person ? (
      <PeopleState title="Selecciona una persona" detail="Aqui se mostrara el detalle disponible." />
    ) : (
      <div className="p-5">
        <div className="flex items-start gap-4">
          <Avatar name={person.name} src={person.avatarUrl} size="xl" />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold leading-snug text-gray-900">{person.name}</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <RoleBadge type={person.type} />
              {person.isCurrentUser && (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">Cuenta actual</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <DetailRow icon={UserRound} label="Aula" value={classroomLabel(person)} />
          <DetailRow icon={Mail} label="Correo" value={person.email || 'No registrado'} />
          <DetailRow icon={BookOpen} label={person.type === 'teacher' ? 'Cursos' : 'Codigo'} value={
            person.type === 'teacher'
              ? person.courses?.map((course) => course.title).join(', ') || 'No registrado'
              : person.code || 'No registrado'
          } />
        </div>

        {person.courses?.length > 0 && (
          <div className="mt-5 border-t border-gray-100 pt-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Asignacion por curso</div>
            <div className="mt-3 space-y-2">
              {person.courses.map((course) => (
                <div key={course.id || course.title} className="rounded-lg border border-gray-200 px-3 py-2">
                  <div className="text-sm font-semibold text-gray-800">{course.title}</div>
                  {course.description && (
                    <div className="mt-1 line-clamp-2 text-xs text-gray-500">{course.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <BackendFields raw={person.raw} />
      </div>
    )}
  </aside>
);

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
    {React.createElement(Icon, { className: 'mt-0.5 h-4 w-4 shrink-0 text-gray-400' })}
    <div className="min-w-0">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-0.5 break-words text-sm text-gray-800">{value}</div>
    </div>
  </div>
);

const BackendFields = ({ raw }) => {
  const hidden = new Set([
    'id',
    'id_usuario',
    'id_alumno',
    'id_profesor',
    'nombre',
    'apellido',
    'nombre_completo',
    'name',
    'codigo',
    'correo',
    'email',
    'telefono',
    'phone',
    'grado',
    'seccion',
    'id_aula',
    'url_foto',
    'avatar_url',
  ]);

  const entries = Object.entries(raw || {})
    .filter(([key, value]) => !hidden.has(key) && value !== null && value !== undefined && `${value}` !== '')
    .slice(0, 6);

  if (entries.length === 0) return null;

  return (
    <div className="mt-5 border-t border-gray-100 pt-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Datos disponibles</div>
      <div className="mt-3 space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className="rounded-lg border border-gray-200 px-3 py-2">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              {key.replaceAll('_', ' ')}
            </div>
            <div className="mt-0.5 break-words text-sm text-gray-800">
              {Array.isArray(value) ? `${value.length} elementos` : `${value}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeoplePage;
