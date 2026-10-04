/* @layer renderer-components @kind data */
const COMPACT_AFTER = 24;

const CUSTOM_SCREEN = 'A screen without it is a custom screen built from ScreenWindow.';

const MISSING_HEADER = `ScreenPage needs an icon and a title: every screen kind shows its page header. ${CUSTOM_SCREEN}`;

const headerOptOut = (owner: string) => `${owner} always shows its page header, so pageHeader does nothing. ${CUSTOM_SCREEN}`;

export { COMPACT_AFTER, headerOptOut, MISSING_HEADER };
