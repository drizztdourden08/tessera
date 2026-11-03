/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { VirtualItemProps } from './VirtualItem.type';
import '../../../theme/focus-ring.css';

const VirtualItem = (props: VirtualItemProps) => {
  const { bind, place, slot, children } = props;
  if (slot) {
    return (
      <Box role="presentation" className="virtual-list__slot" style={place}>
        {children}
      </Box>
    );
  }
  return <Box {...bind} style={place}>{children}</Box>;
};

export { VirtualItem };
