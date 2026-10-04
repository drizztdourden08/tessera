/* @layer renderer-components @kind data */
import type { ScreenKind } from './ScreenPage.type';

const COMPACT_AFTER = 24;

const EXPAND_AT = 4;

const HEADER_GAIN = 32;

const CUSTOM_SCREEN = 'A screen that places its header another way is a custom screen built from ScreenWindow.';

const MISSING_HEADER = `ScreenPage needs an icon and a title: WorkspaceScreen and StageScreen always show their page header with both. ${CUSTOM_SCREEN}`;

const HEADER_RULE: Readonly<Record<ScreenKind, string>> = {
  WorkspaceScreen: 'always shows its page header',
  StageScreen: 'always shows its page header',
  UtilityScreen: 'always shows its header at the top of the window',
  InfoScreen: 'has no page header, only the window title bar',
};

const HEADER_KEYS: Readonly<Record<ScreenKind, readonly string[]>> = {
  WorkspaceScreen: ['pageHeader'],
  StageScreen: ['pageHeader'],
  UtilityScreen: ['pageHeader'],
  InfoScreen: ['pageHeader', 'icon', 'heading', 'backdrop'],
};

const headerOptOut = (owner: ScreenKind, keys: readonly string[]) =>
  `${owner} ${HEADER_RULE[owner]}, so ${keys.join(', ')} ${keys.length > 1 ? 'do' : 'does'} nothing. ${CUSTOM_SCREEN}`;

export { COMPACT_AFTER, EXPAND_AT, HEADER_GAIN, HEADER_KEYS, headerOptOut, MISSING_HEADER };
