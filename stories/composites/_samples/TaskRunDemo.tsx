/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import { TaskProgress } from '../../../src/composites';
import type { TaskState } from '../../../src/composites';
import { Box, Button } from '../../../src/primitives';
import { RUN_LOG, RUN_LOG_KINDS, RUN_STEPS } from './task-samples.constants';

const TICK_MS = 160;

const STEP_SPAN = 100 / RUN_STEPS.length;

const TaskRunDemo = () => {
  const [percent, setPercent] = useState(100);
  const [state, setState] = useState<TaskState>('done');
  useEffect(() => {
    if (state !== 'running') return undefined;
    const timer = setInterval(() => setPercent((now) => Math.min(100, now + 2)), TICK_MS);
    return () => clearInterval(timer);
  }, [state]);
  useEffect(() => {
    if (percent >= 100 && state === 'running') setState('done');
  }, [percent, state]);
  const step = RUN_STEPS[Math.min(RUN_STEPS.length - 1, Math.floor(percent / STEP_SPAN))];
  const start = () => {
    setPercent(0);
    setState('running');
  };
  const actions = state === 'running'
    ? <Button variant="tertiary" size="sm" onClick={() => setState('cancelled')}>Cancel</Button>
    : <Button variant="secondary" size="sm" onClick={start}>Run again</Button>;
  return (
    <Box className="task-progress-story">
      <TaskProgress
        state={state}
        percent={percent}
        line={state === 'running' ? `${step?.label ?? ''}` : undefined}
        steps={RUN_STEPS}
        currentId={step?.id}
        log={RUN_LOG.slice(0, 6)}
        logKinds={RUN_LOG_KINDS}
        actions={actions}
      />
    </Box>
  );
};

export { TaskRunDemo };
