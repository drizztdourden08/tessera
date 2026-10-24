/* @layer renderer-components @kind types */
import type { IconName } from '../../primitives/Icon';
import type { Rect } from '../DockLayout/DockLayout.type';

interface DropHintZoneProps {
  hit: Rect;
  kind: 'outer' | 'compass' | 'float';
  icon?: IconName;
  hot: boolean;
}

export type { DropHintZoneProps };
