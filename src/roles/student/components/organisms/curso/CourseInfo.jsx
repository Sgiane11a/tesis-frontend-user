import React from 'react';
import { BookOpen, CalendarClock, CheckCircle2, GraduationCap, Mail, UserRound } from 'lucide-react';
import { useCourseInfo } from '../../../../../hooks/useCourses';

const EmptyText = ({ children = 'Sin informacion registrada.' }) => (
  <p className="text-sm leading-relaxed text-gray-500">{children}</p>
);

const InfoBlock = ({ title, children }) => (
  <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    <div className="mt-2">{children}</div>
  </section>
);

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-3 py-2">
    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
    <div>
      <p className="text-xs font-semibold uppercase text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-700">{value || '-'}</p>
    </div>
  </div>
);

const TeacherCard = ({ teacher, officeHours }) => (
  <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex items-start gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-50 text-sky-700">
        {teacher?.avatarUrl ? (
          <img src={teacher.avatarUrl} alt={teacher.name} className="h-full w-full object-cover" />
        ) : (
          <UserRound className="h-6 w-6" />
        )}
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-gray-800">{teacher?.name || 'Profesor asignado'}</h3>
        <p className="text-sm text-gray-500">{teacher?.email || 'Correo no registrado'}</p>
      </div>
    </div>

    {teacher?.bio ? (
      <p className="mt-4 text-sm leading-relaxed text-gray-600">{teacher.bio}</p>
    ) : (
      <EmptyText>El profesor aun no registro biografia.</EmptyText>
    )}

    <div className="mt-4 grid gap-2">
      <DetailRow icon={Mail} label="Contacto" value={teacher?.phone || teacher?.email} />
      <DetailRow icon={CalendarClock} label="Horario de atencion" value={officeHours} />
    </div>
  </article>
);

const CourseInfo = ({ course: fallbackCourse }) => {
  const courseId = fallbackCourse?.id;
  const aulaId = fallbackCourse?.idAula;
  const { data, isLoading, isError, error } = useCourseInfo(courseId, aulaId);
  const course = data?.course || fallbackCourse || {};
  const teachers = data?.teachers?.length ? data.teachers : (course.teacher ? [course.teacher] : []);
  const classroom = data?.classroom || {
    grado: course.grado,
    seccion: course.seccion,
  };
  const aulaLabel = classroom?.grado && classroom?.seccion ? `${classroom.grado} - ${classroom.seccion}` : 'Sin aula asignada';

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-40 animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
        {error?.message || 'No se pudo cargar la informacion del curso.'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              <BookOpen className="h-3.5 w-3.5" />
              Informacion del curso
            </div>
            <h2 className="mt-3 text-2xl font-bold text-gray-800">{course.title || 'Curso seleccionado'}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {course.description || 'Este curso aun no tiene descripcion registrada.'}
            </p>
          </div>
          <div className="grid min-w-[220px] gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <DetailRow icon={GraduationCap} label="Aula" value={aulaLabel} />
            <DetailRow icon={CheckCircle2} label="Codigo" value={course.id ? `CUR-${course.id}` : null} />
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <div className="grid gap-4 md:grid-cols-2">
          <InfoBlock title="Objetivos">
            {course.objectives ? <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">{course.objectives}</p> : <EmptyText />}
          </InfoBlock>
          <InfoBlock title="Metodologia">
            {course.methodology ? <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">{course.methodology}</p> : <EmptyText />}
          </InfoBlock>
          <InfoBlock title="Criterios de evaluacion">
            {course.evaluationCriteria ? <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">{course.evaluationCriteria}</p> : <EmptyText />}
          </InfoBlock>
          <InfoBlock title="Requisitos">
            {course.requirements ? <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">{course.requirements}</p> : <EmptyText />}
          </InfoBlock>
        </div>

        <aside className="space-y-4">
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <TeacherCard key={teacher.id || teacher.email || teacher.name} teacher={teacher} officeHours={course.officeHours} />
            ))
          ) : (
            <TeacherCard teacher={null} officeHours={course.officeHours} />
          )}
        </aside>
      </div>
    </div>
  );
};

export default CourseInfo;
