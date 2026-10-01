/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import type { DropPopZoneProps } from './DropPopZone.type';

const DropPopZone = (props: DropPopZoneProps) => {
  const { stays } = props;
  const { widgets } = useTesseraStrings();
  return (
    <Box className={`dock-layout__popzone${stays ? ' dock-layout__popzone--stays' : ''}`} aria-hidden="true">
      <Span className="dock-layout__popzone-label">{stays ? widgets.hintStays : widgets.hintPopOut}</Span>
    </Box>
  );
};

export { DropPopZone };
