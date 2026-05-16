import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  IdCard,
  Mail,
  Phone,
  Search,
  Shield,
  UserRound,
  Users,
} from 'lucide-react';
import { StudentPeopleService } from '../../../api';
import { useStudentCourses } from '../../../hooks/useCourses';
import { useAuth } from '../../../hooks/useAuth';
import { Avatar } from '../components/atoms/Avatar';

const PEOPLE_PAGE_SIZE = 6;

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

const formatValue = (value) => {
  if (value === null || value === undefined || `${value}`.trim() === '') return 'No registrado';
  return `${value}`;
};

const formatDate = (value) => {
  if (!value) return 'No registrado';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const emergencyContactText = (contact = {}) => {
  const parts = [
    contact.name,
    contact.relationship ? `(${contact.relationship})` : '',
    contact.phone,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(' ') : 'No registrado';
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
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.max(1, Math.ceil(filteredPeople.length / PEOPLE_PAGE_SIZE));

  const paginatedPeople = useMemo(() => {
    const start = (currentPage - 1) * PEOPLE_PAGE_SIZE;
    return filteredPeople.slice(start, start + PEOPLE_PAGE_SIZE);
  }, [currentPage, filteredPeople]);

  const selectedPerson = useMemo(
    () => filteredPeople.find((person) => person.uid === selectedUid) || filteredPeople[0] || null,
    [filteredPeople, selectedUid]
  );

  useEffect(() => {
    const selectedIsVisible = paginatedPeople.some((person) => person.uid === selectedUid);

    if ((!selectedUid || !selectedIsVisible) && paginatedPeople[0]?.uid) {
      setSelectedUid(paginatedPeople[0].uid);
    }
  }, [paginatedPeople, selectedUid]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeType, searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

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

      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
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

          <div className="flex flex-1 flex-col xl:min-h-0 overflow-y-auto">
            {loading ? (
              <PeopleState title="Cargando personas" detail="Consultando alumnos y profesores del aula." />
            ) : hasError ? (
              <PeopleState title="No se pudo cargar la informacion" detail="Verifica el backend o intenta nuevamente." />
            ) : filteredPeople.length === 0 ? (
              <PeopleState title="Sin resultados" detail="No hay personas que coincidan con los filtros actuales." />
            ) : (
              <PeopleTable
                people={paginatedPeople}
                selectedUid={selectedPerson?.uid}
                onSelect={setSelectedUid}
              />
            )}
          </div>
          {filteredPeople.length > 0 && (
            <PeoplePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredPeople.length}
              pageSize={PEOPLE_PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          )}
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

const PeoplePagination = ({ currentPage, totalPages, totalItems, pageSize, onPageChange }) => {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-500">
        Mostrando <span className="font-semibold text-gray-700">{start}-{end}</span> de{' '}
        <span className="font-semibold text-gray-700">{totalItems}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Pagina anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="min-w-24 text-center text-sm font-semibold text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Pagina siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

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
  <div className="flex flex-1 flex-col items-center justify-center px-6 text-center xl:min-h-0">
    <Users className="mb-3 h-10 w-10 text-gray-300" />
    <h2 className="text-base font-semibold text-gray-800">{title}</h2>
    <p className="mt-1 text-sm text-gray-500">{detail}</p>
  </div>
);

const PersonDetail = ({ person }) => (
  <aside className="rounded-xl border border-gray-200 bg-white shadow-sm xl:overflow-hidden">
    {!person ? (
      <PeopleState title="Selecciona una persona" detail="Aqui se mostrara el detalle disponible." />
    ) : (
      <div className="h-full overflow-y-auto p-5">
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

        {person.type === 'teacher' ? <TeacherDetailFields person={person} /> : <StudentDetailFields person={person} />}
      </div>
    )}
  </aside>
);

const StudentDetailFields = ({ person }) => (
  <div className="mt-5 space-y-4">
    <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg  border border-gray-200 bg-gray-50/70 p-4">
      <DetailRow icon={UserRound} label="Aula" value={classroomLabel(person)} />
      <DetailRow icon={IdCard} label="Codigo" value={formatValue(person.code)} />
      <DetailRow icon={Mail} label="Correo" value={formatValue(person.email)} className="col-span-2" />
      <DetailRow icon={CalendarDays} label="Nacimiento" value={formatDate(person.birthDate)} />
      <DetailRow icon={HeartPulse} label="Alergias" value={formatValue(person.allergies)} />
    </div>

    <DetailBlock icon={BookOpen} label="Biografia" value={formatValue(person.biography)} />

    <div className="rounded-lg border border-sky-100 bg-sky-50/70 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700">
        <Shield className="h-4 w-4" />
        Contacto de emergencia
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        {emergencyContactText(person.emergencyContact)}
      </p>
    </div>
  </div>
);

const TeacherDetailFields = ({ person }) => (
  <div className="mt-5 space-y-4">
    <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border border-gray-200 bg-gray-50/70 p-4">
      <DetailRow
        icon={BookOpen}
        label="Curso en esta aula"
        value={person.courses?.map((course) => course.title).join(', ') || 'No registrado'}
        className="col-span-2"
      />
      <DetailRow icon={Phone} label="Telefono" value={formatValue(person.phone)} />
      <DetailRow icon={Mail} label="Correo" value={formatValue(person.email)} />
      <DetailRow icon={CalendarDays} label="Nacimiento" value={formatDate(person.birthDate)} />
    </div>

    <DetailBlock icon={UserRound} label="Biografia" value={formatValue(person.biography)} />

    {person.courses?.length > 0 && (
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Asignacion por curso</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {person.courses.map((course) => (
            <span key={course.id || course.title} className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              {course.title}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const DetailRow = ({ icon: Icon, label, value, className = '' }) => (
  <div className={`flex min-w-0 gap-2 ${className}`}>
    {React.createElement(Icon, { className: 'mt-0.5 h-4 w-4 shrink-0 text-gray-400' })}
    <div className="min-w-0">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-0.5 break-words text-sm font-medium text-gray-800">{value}</div>
    </div>
  </div>
);

const DetailBlock = ({ icon: Icon, label, value }) => (
  <div>
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
      {React.createElement(Icon, { className: 'h-4 w-4 text-gray-400' })}
      {label}
    </div>
    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-gray-700">{value}</p>
  </div>
);

export default PeoplePage;
