/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ButtonRow } from '../../primitives/ButtonRow';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { LoadError } from '../LoadError';
import { useLogOpen } from './behavior/useLogOpen';
import { TaskLog } from './sub-components/TaskLog';
import { TaskMeter } from './sub-components/TaskMeter';
import { TaskSteps } from './sub-components/TaskSteps';
import { LOG_HEIGHT } from './TaskProgress.constants';
import type { TaskProgressProps } from './TaskProgress.type';
import './TaskProgress.css';

const TaskProgress = (props: TaskProgressProps) => {
  const { state, percent, line, steps, currentId, error, log, logKinds, logOpen, onLogToggle, logHeight = LOG_HEIGHT, label, actions, className } = props;
  const { panels } = useTesseraStrings();
  const logState = useLogOpen(logOpen, onLogToggle, state === 'failed');
  const name = label ?? panels.taskProgress;
  return (
    <Box as="section" className={className ? `task-progress ${className}` : 'task-progress'} data-state={state} aria-label={name}>
      <TaskMeter state={state} percent={percent} line={line} name={name} />
      {steps && steps.length > 0 && <TaskSteps steps={steps} currentId={currentId} state={state} />}
      {state === 'failed' && error && <LoadError variant="box" message={error} />}
      {log && <TaskLog rows={log} kinds={logKinds} open={logState.open} onToggle={logState.toggle} height={logHeight} />}
      {actions && <ButtonRow align="end" className="task-progress__actions">{actions}</ButtonRow>}
    </Box>
  );
};

export { TaskProgress };
