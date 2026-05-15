import React from 'react';
import { teacherModulesCopy } from '../../mocks';
import { useTeacherCourseModules } from '../../hooks';
import { ModulesList } from '../molecules/modules';
import { ModuleDialogs } from './modules';

const TeacherCourseModulesPanel = ({ courseId, aulaId, bimestre }) => {
  const { actions, dialogs, list } = useTeacherCourseModules({ aulaId, bimestre, courseId });

  if (!aulaId) {
    return <div className="text-sm text-amber-600">{teacherModulesCopy.noClassroom}</div>;
  }

  return (
    <div className="space-y-2">
      <ModulesList
        {...list}
        onAddResource={actions.openAddResource}
        onDeleteModule={actions.requestDeleteModule}
        onDeleteResource={actions.requestDeleteResource}
        onEditModule={actions.openEditModule}
        onEditResource={actions.openEditResource}
        onOpenResource={actions.openResource}
        onToggleModule={actions.toggleModule}
        onToggleModuleMenu={actions.toggleModuleMenu}
        onToggleModuleVisibility={actions.handleToggleModuleVisibility}
        onToggleResourceMenu={actions.toggleResourceMenu}
        onToggleResourceVisibility={actions.handleToggleResourceVisibility}
      />

      <ModuleDialogs actions={actions} bimestre={bimestre} dialogs={dialogs} />
    </div>
  );
};

export default TeacherCourseModulesPanel;
