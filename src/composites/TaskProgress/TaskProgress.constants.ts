/* @layer renderer-components @kind data */
import type { ProgressTone } from '../../primitives/ProgressBar/ProgressBar.type';
import type { TaskState } from './TaskProgress.type';

const LOG_HEIGHT = 224;

const BAR_TONE: Readonly<Record<TaskState, ProgressTone>> = {
  running: 'primary',
  done: 'success',
  failed: 'danger',
  cancelled: 'tertiary',
};

export { BAR_TONE, LOG_HEIGHT };
