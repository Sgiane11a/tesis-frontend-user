import React, { useEffect, useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import { TeacherStudentsService } from '../../../../api/services/teacherStudents.service';
import StudentsToolbar from '../molecules/students/StudentsToolbar';
import StudentsTable from '../molecules/students/StudentsTable';
import StudentsPagination from '../molecules/students/StudentsPagination';
import StudentReportModal from './students/StudentReportModal';
import { pageSize } from '../../utils/studentPerformance';

const TeacherCourseStudentsPanel = ({ course }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadStudents = async () => {
      if (!course?.idAula) {
        setStudents([]);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const data = await TeacherStudentsService.getByClassroom(course.idAula);
        if (mounted) setStudents(data);
      } catch (err) {
        if (mounted) setError(err?.message || 'No se pudieron cargar los estudiantes.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadStudents();

    return () => {
      mounted = false;
    };
  }, [course?.idAula]);

  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch = !term
        || student.name.toLowerCase().includes(term)
        || student.email.toLowerCase().includes(term);
      const matchesFilter = filter === 'all' || student.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [filter, search, students]);

  const pageCount = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visibleStudents = filteredStudents.slice((safePage - 1) * pageSize, safePage * pageSize);
  const from = filteredStudents.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, filteredStudents.length);

  if (!course?.idAula) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
        <h2 className="text-base font-semibold text-gray-800">No se encontro aula</h2>
        <p className="mt-2 text-sm text-gray-500">Selecciona un curso con aula asignada para ver estudiantes.</p>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <StudentsToolbar
        courseTitle={course?.title}
        search={search}
        filter={filter}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
      />

      <StudentsTable
        students={visibleStudents}
        loading={loading}
        error={error}
        onViewStudent={setSelectedStudent}
      />

      <StudentsPagination
        from={from}
        to={to}
        total={filteredStudents.length}
        page={safePage}
        pageCount={pageCount}
        onPageChange={setPage}
      />

      <StudentReportModal
        student={selectedStudent}
        course={course}
        onClose={() => setSelectedStudent(null)}
      />
    </section>
  );
};

export default TeacherCourseStudentsPanel;
