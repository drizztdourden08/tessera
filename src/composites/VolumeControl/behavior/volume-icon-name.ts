/* @layer renderer-components @kind util */
import type { IconName } from '../../../primitives/Icon/Icon.type';

const volumeIconName = (level: number, min: number, max: number, muted: boolean): IconName => {
  if (muted || level <= min) return 'volume-x';
  return (level - min) / (max - min) < 0.5 ? 'volume-1' : 'volume-2';
};

export { volumeIconName };
