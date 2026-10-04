/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Status } from '../../../primitives/Status';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { COUNTED_STATES } from '../CheckList.constants';
import type { CheckCountsProps } from '../CheckList.type';

const CheckCounts = (props: CheckCountsProps) => {
  const { checks, statuses } = props;
  const { items } = useTesseraStrings();
  const counted = COUNTED_STATES
    .map((state) => ({ state, count: checks.filter((check) => check.state === state).length }))
    .filter((entry) => entry.count > 0);
  return (
    <Box role="status" className="check-list__counts">
      {counted.map(({ state, count }) => (
        <Status key={state} tone={statuses[state].tone} dot className="check-list__count" data-state={state}>{items.checkCount(count, statuses[state].label)}</Status>
      ))}
    </Box>
  );
};

export { CheckCounts };
