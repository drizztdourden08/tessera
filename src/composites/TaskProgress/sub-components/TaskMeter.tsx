/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../../primitives/Box';
import { ProgressBar } from '../../../primitives/ProgressBar';
import { Status } from '../../../primitives/Status';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { taskStatuses } from '../behavior/task-statuses';
import { BAR_TONE } from '../TaskProgress.constants';
import type { TaskMeterProps } from '../TaskProgress.type';

const TaskMeter = (props: TaskMeterProps) => {
  const { state, percent, line, name } = props;
  const { panels } = useTesseraStrings();
  const statuses = useMemo(() => taskStatuses(panels), [panels]);
  return (
    <>
      <Box className="task-progress__head">
        <Span className="task-progress__line">{line}</Span>
        <Status map={statuses} value={state} role="status" className="task-progress__state" />
      </Box>
      <ProgressBar
        value={percent ?? (state === 'done' ? 100 : 0)}
        indeterminate={percent === undefined && state === 'running'}
        showValue={percent !== undefined}
        tone={BAR_TONE[state]}
        label={name}
      />
    </>
  );
};

export { TaskMeter };
