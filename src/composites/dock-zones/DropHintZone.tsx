/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Icon } from '../../primitives/Icon';
import { rectStyle } from '../rect-drag/rect-style';
import type { DropHintZoneProps } from './DropHintZone.type';
import './DropHintZone.css';

const DropHintZone = (props: DropHintZoneProps) => {
  const { hit, kind, icon, hot } = props;
  return (
    <Box className={`dock-hint dock-hint--${kind}${hot ? ' dock-hint--hot' : ''}`} style={rectStyle(hit)} aria-hidden="true">
      {icon && <Icon name={icon} size={18} className="dock-hint__icon" />}
    </Box>
  );
};

export { DropHintZone };
