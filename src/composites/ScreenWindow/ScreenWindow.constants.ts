/* @layer renderer-components @kind data */
const TOP_ONLY = 'ScreenWindow shows subtitle and extra only in its default title bar. With header, use header.strip or header.actions.';

const BARE_ONLY = 'ScreenWindow takes titleRow={false} without header, and movable only with titleRow={false}.';

const LOCKED_KEY_SUFFIX = ':locked';

const RECT_KEY_SUFFIX = ':rect';

const RECT_FIELDS = ['x', 'y', 'width', 'height'] as const;

const LOCK_BOX = '0 0 24 24';

const LOCK_BODY = { x: 3, y: 11, width: 18, height: 11, rx: 2 } as const;

const LOCK_SHACKLE = 'M7 11V7a5 5 0 0 1 10 0v4';

export { BARE_ONLY, LOCK_BODY, LOCK_BOX, LOCK_SHACKLE, LOCKED_KEY_SUFFIX, RECT_FIELDS, RECT_KEY_SUFFIX, TOP_ONLY };
