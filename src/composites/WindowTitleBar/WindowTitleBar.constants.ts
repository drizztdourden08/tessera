/* @layer renderer-components @kind data */
import type { BarFit } from './behavior/bar-fit.type';
import type { MenuControl, MenuControlRow } from './behavior/menu-control.type';
import type { WindowControl, WindowControlsConfig, WindowTitleBarItemId, WindowTitleBarProps } from './WindowTitleBar.type';

const PEEK_ZONE_PX = 40;

const CAPTION_GLYPH_SIZE = 16;

const CAPTION_STROKE = 1.25;

const BRAND_CLEARANCE_PX = 12;

const MARK_CLEARANCE_PX = 4;

const START_SELECTOR = '.window-title-bar__start';

const CONTROLS_SELECTOR = '.window-title-bar__controls';

const CONTROL_CLASS = 'window-title-bar__control';

const LOGO_SELECTOR = '.window-title-bar__logo';

const PROBE_SELECTOR = '.window-title-bar__probe';

const ITEM_ATTRIBUTE = 'data-bar-item';

const ITEM_SELECTOR = `[${ITEM_ATTRIBUTE}]`;

const ITEM_AWAY_CLASS = 'window-title-bar__item--away';

const VOLUME_MUTE_SUFFIX = '-mute';

const VOLUME_LEVEL_SUFFIX = '-level';

const PIN_ITEM: WindowTitleBarItemId = 'control:pin';

const FULLSCREEN_ITEM: WindowTitleBarItemId = 'control:fullscreen';

const ACTION_ITEM_PREFIX = 'action:';

const MAIN_MENU_ID = 'window-title-bar-menu';

const FULL_FIT: BarFit = { hidden: [], brand: 'full' };

const NO_ACTIONS: NonNullable<WindowTitleBarProps['actions']> = [];

const NO_MENU: NonNullable<WindowTitleBarProps['menu']> = [];

const ALL_CONTROLS: WindowControlsConfig = {};

const NO_CONTROLS: WindowControlsConfig = { fullscreen: false, pin: false, minimize: false, maximize: false, close: false };

const CAPTION_CONTROLS: readonly WindowControl[] = ['fullscreen', 'minimize', 'maximize', 'close'];

const MENU_CONTROLS: readonly MenuControl[] = ['pin', 'fullscreen'];

const MENU_CONTROL_ROWS: Record<MenuControl, readonly [off: MenuControlRow, on: MenuControlRow]> = {
  pin: [{ icon: 'pin', label: 'pinOnTop' }, { icon: 'pin-off', label: 'unpin' }],
  fullscreen: [{ icon: 'maximize-2', label: 'fullscreen' }, { icon: 'minimize-2', label: 'exitFullscreen' }],
};

const BAR_GROUP_ID = 'window-title-bar';

const VIEW_ITEM_ID = 'window-title-bar-view';

const SLIDE_ANIMATION_ID = 'window-title-bar-slide';

const SLIDE_DURATION_TOKEN = '--duration-slow';

const SLIDE_EASE_TOKEN = '--ease-standard';

const MIN_SHIFT_PX = 0.5;

const STATUS_STAGGER_MS = 40;

const STATUS_REPEAT_MS = 4000;

export {
  ACTION_ITEM_PREFIX, ALL_CONTROLS, CAPTION_CONTROLS, NO_ACTIONS, NO_CONTROLS, NO_MENU, BAR_GROUP_ID, BRAND_CLEARANCE_PX, CAPTION_GLYPH_SIZE, CAPTION_STROKE, CONTROL_CLASS, CONTROLS_SELECTOR, FULL_FIT, FULLSCREEN_ITEM,
  ITEM_ATTRIBUTE, ITEM_AWAY_CLASS, ITEM_SELECTOR, LOGO_SELECTOR, MAIN_MENU_ID, MARK_CLEARANCE_PX, MENU_CONTROL_ROWS, MENU_CONTROLS, MIN_SHIFT_PX, PEEK_ZONE_PX, PIN_ITEM, PROBE_SELECTOR,
  SLIDE_ANIMATION_ID, SLIDE_DURATION_TOKEN, SLIDE_EASE_TOKEN, START_SELECTOR, STATUS_REPEAT_MS, STATUS_STAGGER_MS, VIEW_ITEM_ID, VOLUME_LEVEL_SUFFIX, VOLUME_MUTE_SUFFIX,
};
