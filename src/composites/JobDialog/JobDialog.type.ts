/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
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
  id?: string;
  data?: DataAttributes;
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
