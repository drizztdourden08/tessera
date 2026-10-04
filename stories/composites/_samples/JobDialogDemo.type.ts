/* @layer stories @kind types */
import type { TaskState } from '../../../src/composites';

interface JobDialogDemoProps {
  start: TaskState;
  percent?: number;
  label: string;
}

export type { JobDialogDemoProps };
