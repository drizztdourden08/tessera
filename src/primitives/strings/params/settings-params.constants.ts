/* @layer renderer-components @kind data */
const SETTINGS_PARAMS = {
  changeShortcut: ['title'],
  pickColour: ['title'],
  aboutSetting: ['title'],
  settingsMatch: ['count', 'query'],
  noSettingMatches: ['query'],
} as const;

export { SETTINGS_PARAMS };
