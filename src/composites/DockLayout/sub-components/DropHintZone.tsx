/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { HINT_ICONS } from '../DockLayout.constants';
import type { DropZone } from '../behavior/drag.type';
import { rectStyle } from '../behavior/rect-style';
import type { DropHintZoneProps } from './DropHintZone.type';

const iconOf = (zone: DropZone) => {
  const { target } = zone;
  if (target.at === 'tab') return HINT_ICONS.tab;
  return target.at === 'float' ? null : HINT_ICONS[target.edge];
};

const DropHintZone = (props: DropHintZoneProps) => {
  const { zone, hot } = props;
  const icon = zone.kind === 'compass' ? iconOf(zone) : null;
  return (
    <Box className={`dock-hint dock-hint--${zone.kind}${hot ? ' dock-hint--hot' : ''}`} style={rectStyle(zone.hit)} aria-hidden="true">
      {icon && <Icon name={icon} size={18} className="dock-hint__icon" />}
    </Box>
  );
};

export { DropHintZone };
