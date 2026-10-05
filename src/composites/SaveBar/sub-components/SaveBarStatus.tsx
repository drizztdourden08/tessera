/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Status } from '../../../primitives/Status';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { saveStatuses } from '../behavior/save-statuses';
import type { SaveBarStatusProps } from '../SaveBar.type';

const SaveBarStatus = ({ state, error }: SaveBarStatusProps) => {
  const strings = useTesseraStrings();
  const reason = state === 'error' ? error : undefined;
  return (
    <Box as="span" role="status" className="save-bar__status">
      <Status map={saveStatuses(strings)} value={state} dot />
      {reason != null && <Span tone="dim" className="save-bar__reason">{reason}</Span>}
    </Box>
  );
};

export { SaveBarStatus };
