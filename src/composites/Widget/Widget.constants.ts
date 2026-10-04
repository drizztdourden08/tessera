/* @layer renderer-components @kind data */
import type { WidgetVisibility } from './Widget.type';

const DEFAULT_LAYOUT_STORAGE_KEY = 'widget-layout';

const DEFAULT_OPACITY = 0.92;

const DEFAULT_VISIBILITY: WidgetVisibility = 'context-only';

const MIGRATE_SHARE = { outer: 0.22, min: 0.12, max: 0.45 } as const;

const FALLBACK_FLOAT_SIZE = { width: 320, height: 280 } as const;

const MENU_SELECTOR = '.dropdown-menu';

const FALLBACK_SELECTOR = '.anchored-fallback';

const MENU_MARGIN = 8;

const MENU_ROOM = 400;

export {
  DEFAULT_LAYOUT_STORAGE_KEY, DEFAULT_OPACITY, DEFAULT_VISIBILITY, FALLBACK_FLOAT_SIZE, FALLBACK_SELECTOR, MENU_MARGIN, MENU_ROOM, MENU_SELECTOR, MIGRATE_SHARE,
};
