/* @layer renderer-components @kind util */
import { defineStatuses } from '../../../primitives/StatusOf';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

const taskStatuses = (panels: TesseraStrings['panels']) => defineStatuses({
  running: { label: panels.taskRunning, tone: 'info', pulse: true },
  done: { label: panels.taskDone, tone: 'success', icon: 'circle-check' },
  failed: { label: panels.taskFailed, tone: 'danger', icon: 'circle-x' },
  cancelled: { label: panels.taskCancelled, tone: 'neutral', icon: 'circle-alert' },
});

export { taskStatuses };
