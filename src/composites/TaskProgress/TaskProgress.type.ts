/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StepperStep } from '../../primitives/Stepper/Stepper.type';
import type { LogKindDef, LogRow } from '../LogPanel/LogPanel.type';

type TaskState = 'running' | 'done' | 'failed' | 'cancelled';

interface TaskProgressProps {
  state: TaskState;
  percent?: number;
  line?: ReactNode;
  steps?: readonly StepperStep[];
  currentId?: string;
  error?: ReactNode;
  log?: readonly LogRow[];
  logKinds?: readonly LogKindDef[];
  logOpen?: boolean;
  onLogToggle?: (open: boolean) => void;
  logHeight?: number;
  label?: string;
  actions?: ReactNode;
  className?: string;
}

interface TaskLogProps {
  rows: readonly LogRow[];
  kinds?: readonly LogKindDef[];
  open: boolean;
  onToggle: (open: boolean) => void;
  height: number;
}

interface TaskMeterProps {
  state: TaskState;
  percent?: number;
  line?: ReactNode;
  name: string;
}

interface TaskStepsProps {
  steps: readonly StepperStep[];
  currentId?: string;
  state: TaskState;
}

export type { TaskLogProps, TaskMeterProps, TaskProgressProps, TaskState, TaskStepsProps };
