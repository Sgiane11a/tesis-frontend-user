import React from 'react';
import {
  ConfirmDialog,
  EditModuleModal,
  EditResourceModal,
  FeedbackDialog,
  ModuleFormModal,
  ResourceFormModal,
  ResourceViewerModal,
} from '../../molecules/modules';

const ModuleDialogs = ({ actions, bimestre, dialogs }) => (
  <>
    {dialogs.moduleForm.open && (
      <ModuleFormModal
        bimestre={bimestre}
        form={dialogs.moduleForm}
        onClose={actions.resetModuleForm}
        onSubmit={actions.submitCreateModule}
        onUpdate={(patch) => actions.setModuleForm((prev) => ({ ...prev, ...patch }))}
      />
    )}

    {dialogs.resourceForm.open && (
      <ResourceFormModal
        form={dialogs.resourceForm}
        onClose={actions.closeResourceForm}
        onSubmit={actions.submitAddResource}
        onUpdate={(patch) => actions.setResourceForm((prev) => ({ ...prev, ...patch }))}
      />
    )}

    {dialogs.confirmDialog.open && (
      <ConfirmDialog
        dialog={dialogs.confirmDialog}
        onCancel={actions.closeConfirmDialog}
        onConfirm={actions.runConfirmDialog}
      />
    )}

    {dialogs.viewer.open && dialogs.viewer.resource && (
      <ResourceViewerModal
        resource={dialogs.viewer.resource}
        viewerConfig={dialogs.viewerConfig}
        onClose={actions.closeViewer}
      />
    )}

    {dialogs.feedbackDialog.open && (
      <FeedbackDialog
        dialog={dialogs.feedbackDialog}
        onClose={actions.closeFeedbackDialog}
      />
    )}

    {dialogs.editModuleForm.open && (
      <EditModuleModal
        form={dialogs.editModuleForm}
        onClose={actions.closeEditModuleForm}
        onSubmit={actions.submitEditModule}
        onUpdate={(patch) => actions.setEditModuleForm((prev) => ({ ...prev, ...patch }))}
      />
    )}

    {dialogs.editResourceForm.open && (
      <EditResourceModal
        form={dialogs.editResourceForm}
        onClose={actions.closeEditResourceForm}
        onSubmit={actions.submitEditResource}
        onUpdate={(patch) => actions.setEditResourceForm((prev) => ({ ...prev, ...patch }))}
      />
    )}
  </>
);

export default ModuleDialogs;
