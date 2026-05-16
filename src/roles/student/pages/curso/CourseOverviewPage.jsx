import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bot, BookOpen, ChevronRight, ClipboardList, Info, Layers, Trophy } from 'lucide-react';
import { useStudentCourses } from '../../../../hooks/useCourses';
import { StudentPeopleService } from '../../../../api';

const COURSE_BANNER =
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80';

const studentObjectives = [
  'Revisar los materiales publicados por tu profesor.',
  'Resolver retos y actividades para reforzar cada tema.',
  'Usar ChatIA como apoyo para estudiar y aclarar dudas.',
  'Consultar la informacion general del curso cuando la necesites.',
];

const CourseOverviewPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { data: courses = [] } = useStudentCourses();

  const course = useMemo(
    () => courses.find((item) => String(item.id) === String(courseId)),
    [courses, courseId]
  );

  const { data: classroomCourses } = useQuery({
    queryKey: ['student-course-teachers', course?.idAula],
    queryFn: () => StudentPeopleService.getCoursesTeachersByClassroom(course.idAula, {
      grado: course?.grado,
      seccion: course?.seccion,
    }),
    enabled: !!course?.idAula && !course?.teacher,
    staleTime: 5 * 60 * 1000,
  });

  const fallbackTeacher = useMemo(() => {
    const matchingCourse = classroomCourses?.courses?.find((item) =>
      String(item?.id_curso ?? item?.id) === String(courseId)
    );
    return matchingCourse?.profesores?.[0] || null;
  }, [classroomCourses, courseId]);

  const title = course?.title || 'Historia del Peru - Primer Ano';
  const description =
    course?.description ||
    'Bienvenido al curso. Desde esta vista puedes entrar a tus modulos, practicar con retos, conversar con ChatIA y revisar la informacion general.';
  const progress = Number(course?.progress ?? 0);
  const averageScore = Number(course?.averageScore ?? 0);
  const aulaLabel = course?.seccion ? `Seccion ${course.seccion}` : 'Sin aula';
  const aulaCaption = course?.grado ? `${course.grado} grado` : 'grado pendiente';
  const fallbackTeacherName = `${fallbackTeacher?.nombre ?? ''} ${fallbackTeacher?.apellido ?? ''}`.trim();
  const teacherName = course?.teacher?.name || fallbackTeacher?.nombre_completo || fallbackTeacher?.name || fallbackTeacherName || 'Por asignar';

  const stats = [
    { label: 'Mi avance', value: `${progress}%`, caption: 'completado del curso' },
    { label: 'Aula', value: aulaLabel, caption: aulaCaption },
    { label: 'Docente', value: teacherName, caption: 'quien ensena este curso' },
    { label: 'Promedio', value: averageScore || '-', caption: 'referencial del curso' },
  ];

  const shortcuts = [
    { label: 'Modulos', icon: Layers, path: 'modulos', primary: true },
    { label: 'Retos', icon: Trophy, path: 'retos' },
    { label: 'ChatIA', icon: Bot, path: 'chatia' },
    { label: 'Informacion', icon: Info, path: 'info' },
  ];

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="relative min-h-[320px]">
          <img
            src={course?.imageUrl || COURSE_BANNER}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/45 to-gray-950/10" />
          <div className="relative z-10 flex min-h-[320px] max-w-3xl flex-col justify-end p-6 text-white md:p-8">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <BookOpen className="h-3.5 w-3.5" />
              Vista del alumno
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-100 md:text-base">{description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('modulos')}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Entrar a modulos
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate('retos')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Practicar retos
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 p-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-gray-400">{stat.label}</p>
              <p className="mt-1 truncate text-xl font-bold text-gray-800" title={String(stat.value)}>{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.caption}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">Tu ruta de aprendizaje</h2>
              <p className="text-sm text-gray-500">Una vista rapida antes de entrar a las secciones del curso.</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {studentObjectives.map((objective) => (
              <div key={objective} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                {objective}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800">Accesos del curso</h3>
          <div className="mt-4 grid grid-cols-1 gap-2">
            {shortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center justify-between rounded-lg border px-3 py-3 text-left text-sm font-semibold ${
                    item.primary
                      ? 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default CourseOverviewPage;
