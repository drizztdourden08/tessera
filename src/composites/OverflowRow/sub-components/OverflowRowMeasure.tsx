/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { renderNode } from '../behavior/render-node';
import type { OverflowRowMeasureProps } from '../OverflowRow.type';

const OverflowRowMeasure = (props: OverflowRowMeasureProps) => {
  const { measureRef, items, label } = props;
  return (
    <Box className="overflow-row__measure" aria-hidden inert>
      <Box ref={measureRef} className="overflow-row__measure-row">
        {items.map((item) => <Box key={item.id}>{renderNode(item.node, false)}</Box>)}
        <IconButton label={label} tabIndex={-1}><Icon name="ellipsis" /></IconButton>
      </Box>
    </Box>
  );
};

export { OverflowRowMeasure };
