/* @layer stories @kind data */
import type { SettingsOption } from '../../../src/composites';

const LANGUAGES: readonly SettingsOption[] = [
  { value: 'en', label: 'English', hint: 'Menus and dialogue in English.' },
  { value: 'fr', label: 'Français', hint: 'Menus and dialogue in French; game names stay as they are.' },
  { value: 'de', label: 'Deutsch', hint: 'Menus in German; some packs still read in English.' },
];

const WINDOW_MODES: readonly SettingsOption[] = [
  { value: 'windowed', label: 'Windowed', hint: 'A normal window you can move and resize.' },
  { value: 'borderless', label: 'Borderless', hint: 'Fills the screen with no frame, and alt-tabs instantly.' },
  { value: 'fullscreen', label: 'Fullscreen', hint: 'Takes over the display; lowest latency, slowest to switch away.' },
];

const SCALES: readonly SettingsOption[] = [
  { value: '90', label: '90%', hint: 'More rows fit; text gets small on a laptop.' },
  { value: '100', label: '100%', hint: 'The size the app is designed at.' },
  { value: '125', label: '125%', hint: 'Easier to read from the couch.' },
];

const START_PAGES: readonly SettingsOption[] = [
  { value: 'home', label: 'Home', hint: 'Opens on the overview.' },
  { value: 'last', label: 'Last page', hint: 'Opens where you left off.' },
];

const CHANNELS: readonly SettingsOption[] = [
  { value: '1', label: 'Mono', hint: 'Folds the output to one channel, for one earbud.' },
  { value: '2', label: 'Stereo', hint: 'Keeps left and right apart.' },
];

const ALERTS: readonly SettingsOption[] = [
  { value: 'joins', label: 'Joins', hint: 'A player joins or leaves the session.' },
  { value: 'items', label: 'Items', hint: 'Someone sends you an item.' },
  { value: 'chat', label: 'Chat', hint: 'A message mentions your name.' },
];

const BUFFERS = ['512', '1024', '2048', '4096'];

const BUFFER_HINTS = [
  'Lowest delay; may crackle on a busy machine.',
  'Low delay, steady on most machines.',
  'Steady everywhere, with a short delay.',
  'Never crackles; sound trails the picture a little.',
];

const brightnessHint = (value: number): string => {
  if (value < 35) return 'Darker than the original; good in a bright room.';
  if (value > 65) return 'Brighter than the original; colours wash out past 80.';
  return 'Close to the original picture.';
};

export { ALERTS, BUFFER_HINTS, BUFFERS, brightnessHint, CHANNELS, LANGUAGES, SCALES, START_PAGES, WINDOW_MODES };
