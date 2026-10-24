/* @layer renderer-components @kind constants */
const PATH_JOIN = ' › ';

const JOIN_MARGIN = 8;

const JOIN_FLUSH = 0.5;

const SAFE_AREA_GRACE = 400;

const SAFE_AREA_SLACK = 4;

const HOVER_OPEN_DELAY = 250;

const HOVER_CLOSE_GRACE = 300;

const SIDE_ROOM = 220;

const SURFACE_SELECTOR = '.dropdown-surface';

const SUB_MENU_SELECTOR = '.dropdown-menu--sub';

const TUNNEL_SELECTOR = ':scope > .dropdown__tunnel';

const JOIN_SCROLLER = '[role="menu"], [data-join-scroller]';

const JOIN_ITEM = '[role^="menuitem"], [data-join-item]';

const SLIDER_OWN_KEYS: readonly string[] = ['ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown'];

export {
  HOVER_CLOSE_GRACE, HOVER_OPEN_DELAY, JOIN_FLUSH, JOIN_ITEM, JOIN_MARGIN, JOIN_SCROLLER, PATH_JOIN, SAFE_AREA_GRACE, SAFE_AREA_SLACK, SIDE_ROOM, SUB_MENU_SELECTOR,
  SLIDER_OWN_KEYS, SURFACE_SELECTOR, TUNNEL_SELECTOR,
};
