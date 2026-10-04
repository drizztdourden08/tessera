/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { TaskProgressProps } from '../TaskProgress/TaskProgress.type';

interface JobDialogProps extends Omit<TaskProgressProps, 'actions' | 'className'> {
  open: boolean;
  title: ReactNode;
  onHide: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  cancelling?: boolean;
  actions?: ReactNode;
  className?: string;
}

interface JobDialogActionsProps {
  running: boolean;
  onHide: () => void;
  onCancel?: () => void;
  onClose: () => void;
  cancelling: boolean;
  extra?: ReactNode;
  mainRef: RefObject<HTMLButtonElement | null>;
}

export type { JobDialogActionsProps, JobDialogProps };
