/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import { JobDialog } from '../../../src/composites';
import type { TaskState } from '../../../src/composites';
import { Box, Button } from '../../../src/primitives';
import type { JobDialogDemoProps } from './JobDialogDemo.type';
import { RUN_ERROR, RUN_LINE, RUN_LOG, RUN_LOG_KINDS, RUN_STEPS } from './task-samples.constants';

const TICK_MS = 200;

const JobDialogDemo = (props: JobDialogDemoProps) => {
  const { start, percent: from = 30, label } = props;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<TaskState>(start);
  const [percent, setPercent] = useState(from);
  useEffect(() => {
    if (state !== 'running') return undefined;
    const timer = setInterval(() => setPercent((now) => (now >= 96 ? now : now + 1)), TICK_MS);
    return () => clearInterval(timer);
  }, [state]);
  const retry = () => {
    setPercent(0);
    setState('running');
  };
  return (
    <Box className="story-row">
      <Button onClick={() => setOpen(true)}>{state === 'running' ? `${label} (${percent}%)` : label}</Button>
      <JobDialog
        open={open}
        title="Generating Friday async"
        state={state}
        percent={percent}
        line={state === 'running' ? RUN_LINE : undefined}
        steps={RUN_STEPS}
        currentId="generate"
        error={RUN_ERROR}
        log={RUN_LOG}
        logKinds={RUN_LOG_KINDS}
        onHide={() => setOpen(false)}
        onCancel={() => setState('cancelled')}
        actions={state === 'failed' ? <Button variant="secondary" onClick={retry}>Try again</Button> : undefined}
      />
    </Box>
  );
};

export { JobDialogDemo };
