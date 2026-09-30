/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { HINT_LABELS } from '../DockLayout.constants';
import type { DropPopZoneProps } from './DropPopZone.type';

const DropPopZone = (props: DropPopZoneProps) => {
  const { stays } = props;
  return (
    <Box className={`dock-layout__popzone${stays ? ' dock-layout__popzone--stays' : ''}`} aria-hidden="true">
      <Span className="dock-layout__popzone-label">{stays ? HINT_LABELS.stays : HINT_LABELS.popOut}</Span>
    </Box>
  );
};

export { DropPopZone };
