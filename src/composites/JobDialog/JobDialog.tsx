/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { DialogShell } from '../DialogShell';
import { TaskProgress } from '../TaskProgress';
import { JobDialogActions } from './sub-components/JobDialogActions';
import type { JobDialogProps } from './JobDialog.type';
import './JobDialog.css';

const JobDialog = (props: JobDialogProps) => {
  const { open, title, onHide, onCancel, onClose = onHide, cancelling = false, actions, className, ...task } = props;
  const mainRef = useRef<HTMLButtonElement>(null);
  const running = task.state === 'running';
  const footer = (
    <JobDialogActions running={running} onHide={onHide} onCancel={onCancel} onClose={onClose} cancelling={cancelling} extra={actions} mainRef={mainRef} />
  );
  return (
    <DialogShell
      open={open}
      onClose={running ? onHide : onClose}
      title={title}
      actions={footer}
      initialFocusRef={mainRef}
      className={className ? `job-dialog ${className}` : 'job-dialog'}
    >
      <TaskProgress {...task} />
    </DialogShell>
  );
};

export { JobDialog };
