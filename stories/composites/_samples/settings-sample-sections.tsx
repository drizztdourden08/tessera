/* @layer stories @kind data */
import type { SettingsSectionData } from '../../../src/composites';
import {
  ALERTS, BUFFER_HINTS, BUFFERS, brightnessHint, CHANNELS, LANGUAGES, SCALES, START_PAGES, WINDOW_MODES,
} from './settings-sample-options';
import type { SampleState } from './settings-sample-state';

const quietText = (value: Record<string, unknown>): string => `${String(value.hh)}:${String(value.mm).padStart(2, '0')} ${String(value.ampm)}`;

const generalSections = ({ s, set, changed, reset }: SampleState): SettingsSectionData[] => [
  {
    id: 'startup',
    title: 'Startup',
    changedCount: changed(['restore', 'updates', 'language', 'startPage']),
    onReset: () => reset(['restore', 'updates', 'language', 'startPage']),
    rows: [
      { id: 'restore', title: 'Open the last screen on launch', input: { kind: 'toggle', value: s.restore, onChange: (v) => set({ restore: v }), hints: { on: 'You land where you left off.', off: 'You always land on Home.' } } },
      { id: 'updates', title: 'Check for updates', description: 'Once a day, in the background.', input: { kind: 'toggle', value: s.updates, onChange: (v) => set({ updates: v }) } },
      { id: 'language', title: 'Language', description: 'The language of menus and dialogue.', keywords: 'locale translation', input: { kind: 'select', value: s.language, onChange: (v) => set({ language: v }), options: LANGUAGES } },
      { id: 'start-page', title: 'First page', input: { kind: 'radio', value: s.startPage, onChange: (v) => set({ startPage: v }), options: START_PAGES } },
    ],
  },
  {
    id: 'tray',
    title: 'Tray',
    groups: [{
      id: 'tray-icon',
      title: 'Icon',
      rows: [
        { id: 'tray', title: 'Show a tray icon', input: { kind: 'toggle', value: s.tray, onChange: (v) => set({ tray: v }) } },
        { id: 'close-to-tray', title: 'Close to the tray', description: 'The close button hides the window and keeps sessions running.', lock: s.tray ? null : 'Turn on the tray icon first', input: { kind: 'toggle', value: s.closeToTray, onChange: (v) => set({ closeToTray: v }) } },
      ],
    }],
  },
];

const displaySections = ({ s, set }: SampleState): SettingsSectionData[] => [
  {
    id: 'window',
    title: 'Window',
    rows: [
      { id: 'window-mode', title: 'Window mode', description: 'How the window fills the screen.', input: { kind: 'segmented', value: s.windowMode, onChange: (v) => set({ windowMode: v }), options: WINDOW_MODES } },
      { id: 'scale', title: 'Interface size', hint: 'Applies at once, no restart.', input: { kind: 'select', value: s.scale, onChange: (v) => set({ scale: v }), options: SCALES } },
      { id: 'brightness', title: 'Brightness', input: { kind: 'slider', value: s.brightness, onChange: (v) => set({ brightness: v }), min: 0, max: 100, formatValue: (v) => `${v}%`, hintOf: brightnessHint } },
    ],
  },
  {
    id: 'colour',
    title: 'Colour',
    rows: [{ id: 'accent', title: 'Accent colour', description: 'Highlights, the current page and focus rings.', input: { kind: 'color', value: s.accent, onChange: (v) => set({ accent: v }) } }],
  },
];

const audioSections = ({ s, set }: SampleState): SettingsSectionData[] => [
  {
    id: 'output',
    title: 'Output',
    rows: [
      { id: 'volume', title: 'Master volume', input: { kind: 'slider', value: s.volume, onChange: (v) => set({ volume: v }), min: 0, max: 100, formatValue: (v) => `${v}%` } },
      { id: 'channels', title: 'Channels', input: { kind: 'segmented', value: s.channels, onChange: (v) => set({ channels: v }), options: CHANNELS } },
      { id: 'buffer', title: 'Buffer size', description: 'Smaller is faster; larger is steadier.', input: { kind: 'slider', value: s.buffer, onChange: (v) => set({ buffer: v }), min: 0, max: 3, step: 1, formatValue: (v) => BUFFERS[v] ?? '', hintOf: (v) => BUFFER_HINTS[v] } },
    ],
  },
  {
    id: 'alerts',
    title: 'Alerts',
    rows: [
      { id: 'alerts', title: 'Play a sound for', input: { kind: 'multi', value: s.alerts, onChange: (v) => set({ alerts: v }), options: ALERTS } },
      { id: 'quiet-from', title: 'Quiet hours from', description: 'No alert sounds after this time.', input: { kind: 'dynamic', value: s.quietFrom, onChange: (v) => set({ quietFrom: v }), pattern: '[icon:clock] {hh:hour 12h}:{mm:minute step5} {ampm:choice AM|PM muted "AM or PM"}', text: quietText } },
    ],
  },
];

const accountSections = ({ s, set }: SampleState): SettingsSectionData[] => [
  {
    id: 'profile',
    title: 'Profile',
    rows: [
      { id: 'name', title: 'Display name', description: 'What other players see in a session.', input: { kind: 'text', value: s.name, onChange: (v) => set({ name: v }), placeholder: 'Your name' } },
      { id: 'password', title: 'Server password', input: { kind: 'password', value: s.password, onChange: (v) => set({ password: v }) } },
      { id: 'tags', title: 'Tags', description: 'Shown on your sessions in the browser.', input: { kind: 'tags', value: s.tags, onChange: (v) => set({ tags: v }), suggestions: ['async', 'weekly', 'casual', 'race'] } },
    ],
  },
  {
    id: 'network',
    title: 'Network',
    rows: [{ id: 'port', title: 'Port', hint: 'Other players connect to this port.', input: { kind: 'number', value: s.port, onChange: (v) => set({ port: v }), min: 1024, max: 65535 } }],
  },
];

const controlsSections = ({ s, set }: SampleState): SettingsSectionData[] => [{
  id: 'shortcuts',
  title: 'Shortcuts',
  rows: [
    { id: 'shortcut-search', title: 'Search', description: 'Opens the search from anywhere.', input: { kind: 'keybind', value: s.search, onChange: (v) => set({ search: v }) } },
    { id: 'shortcut-mute', title: 'Mute', input: { kind: 'keybind', value: s.mute, onChange: (v) => set({ mute: v }) } },
  ],
}];

export { accountSections, audioSections, controlsSections, displaySections, generalSections };
