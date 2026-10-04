/* @layer renderer-components @kind data */
import type { IconName } from '../../primitives/Icon/Icon.type';
import type { WindowGuideHint, WindowGuideMode } from './WindowGuideOverlay.type';

const NO_HINTS: readonly WindowGuideHint[] = [];

const MODE_ICONS: Readonly<Record<WindowGuideMode, IconName>> = {
  moving: 'move',
  resizing: 'maximize-2',
};

const MODE_ICON_SIZE = 14;

const SNAP_ICON_SIZE = 12;

export { MODE_ICONS, MODE_ICON_SIZE, NO_HINTS, SNAP_ICON_SIZE };
