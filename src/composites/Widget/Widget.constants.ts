/* @layer renderer-components @kind data */
import type { IconName } from '../../primitives/Icon';
import type { PinMode, WidgetVisibility } from './Widget.type';

const DEFAULT_LAYOUT_STORAGE_KEY = 'widget-layout';

const DEFAULT_OPACITY = 0.92;

const DEFAULT_VISIBILITY: WidgetVisibility = 'context-only';

const MIGRATE_SHARE = { outer: 0.22, min: 0.12, max: 0.45 } as const;

const FALLBACK_FLOAT_SIZE = { width: 320, height: 280 } as const;

const TITLEBAR_HINT = 'Drag to move. Hold Alt to peek at the main view. While dragging: Shift swaps, Ctrl overlays, Esc cancels, past the window edge pops out.';

const OUT_HINT = 'Drag to move the window. Drop it over the app to put it back. Near an edge of the app or another widget, it snaps.';

const PIN_NEXT: Record<PinMode, PinMode> = { off: 'top', top: 'with-app', 'with-app': 'off' };

const PIN_TITLES: Record<PinMode, string> = {
  off: 'Pin: off. Click for always on top.',
  top: 'Pin: always on top. Click to follow the app.',
  'with-app': 'Pin: with the app. Click to unpin.',
};

const PIN_ICONS: Record<PinMode, IconName> = { off: 'pin-off', top: 'pin', 'with-app': 'link' };

export {
  DEFAULT_LAYOUT_STORAGE_KEY, DEFAULT_OPACITY, DEFAULT_VISIBILITY, FALLBACK_FLOAT_SIZE, MIGRATE_SHARE, OUT_HINT, PIN_ICONS, PIN_NEXT,
  PIN_TITLES, TITLEBAR_HINT,
};
