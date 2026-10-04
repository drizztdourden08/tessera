/* @layer renderer-components @kind data */
import type { BarFit } from './behavior/bar-fit.type';
import type { WindowControlsConfig, WindowTitleBarProps } from './WindowTitleBar.type';

const PEEK_ZONE_PX = 40;

const CAPTION_GLYPH_SIZE = 16;

const CAPTION_STROKE = 1.25;

const BRAND_CLEARANCE_PX = 12;

const MARK_CLEARANCE_PX = 4;

const START_SELECTOR = '.window-title-bar__start';

const CONTROLS_SELECTOR = '.window-title-bar__controls';

const LOGO_SELECTOR = '.window-title-bar__logo';

const PROBE_SELECTOR = '.window-title-bar__probe';

const ITEM_ATTRIBUTE = 'data-bar-item';

const ITEM_SELECTOR = `[${ITEM_ATTRIBUTE}]`;

const ITEM_AWAY_CLASS = 'window-title-bar__item--away';

const PIN_ITEM = 'control:pin';

const FULLSCREEN_ITEM = 'control:fullscreen';

const ACTION_ITEM_PREFIX = 'action:';

const FULL_FIT: BarFit = { hidden: [], brand: 'full' };

const NO_ACTIONS: NonNullable<WindowTitleBarProps['actions']> = [];

const NO_MENU: NonNullable<WindowTitleBarProps['menu']> = [];

const ALL_CONTROLS: WindowControlsConfig = {};

const BAR_GROUP_ID = 'window-title-bar';

const VIEW_ITEM_ID = 'window-title-bar-view';

const WINDOW_GROUP_ITEM_ID = 'window-group';

const SLIDE_ANIMATION_ID = 'window-title-bar-slide';

const SLIDE_DURATION_TOKEN = '--duration-slow';

const SLIDE_EASE_TOKEN = '--ease-standard';

const MIN_SHIFT_PX = 0.5;

const STATUS_STAGGER_MS = 40;

const STATUS_REPEAT_MS = 4000;

export {
  ACTION_ITEM_PREFIX, ALL_CONTROLS, NO_ACTIONS, NO_MENU, BAR_GROUP_ID, BRAND_CLEARANCE_PX, CAPTION_GLYPH_SIZE, CAPTION_STROKE, CONTROLS_SELECTOR, FULL_FIT, FULLSCREEN_ITEM,
  ITEM_ATTRIBUTE, ITEM_AWAY_CLASS, ITEM_SELECTOR, LOGO_SELECTOR, MARK_CLEARANCE_PX, MIN_SHIFT_PX, PEEK_ZONE_PX, PIN_ITEM, PROBE_SELECTOR,
  SLIDE_ANIMATION_ID, SLIDE_DURATION_TOKEN, SLIDE_EASE_TOKEN, START_SELECTOR, STATUS_REPEAT_MS, STATUS_STAGGER_MS, VIEW_ITEM_ID,
  WINDOW_GROUP_ITEM_ID,
};
