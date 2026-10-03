/* @layer renderer-components @kind data */
const SETTINGS_STRINGS = {
  on: 'On',
  off: 'Off',
  none: 'None',
  notSet: 'Not set',
  pressKeys: 'Press the keys...',
  changeShortcut: (title: string) => `Change the shortcut for ${title}`,
  pickColour: (title: string) => `Pick a colour for ${title}`,
  aboutSetting: (title: string) => `About ${title}`,
  searchPlaceholder: 'Search all settings',
  searchIdle: 'Type to search every setting, on every page.',
  searchTip: 'Try a shorter word, or the name of what the setting changes.',
  settingsMatch: (count: number, query: string) => `${count} ${count === 1 ? 'setting matches' : 'settings match'} "${query}"`,
  noSettingMatches: (query: string) => `No setting matches "${query}"`,
};

export { SETTINGS_STRINGS };
