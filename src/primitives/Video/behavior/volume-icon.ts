/* @layer renderer-components @kind logic */
import type { IconName } from '../../Icon/Icon.type';

const volumeIcon = (volume: number, muted: boolean): IconName => {
  if (muted || volume === 0) return 'volume-x';
  return volume < 0.5 ? 'volume-1' : 'volume-2';
};

export { volumeIcon };
