/* @layer stories @kind component */
import { useState } from 'react';
import type { SettingsGroupListSection, SettingsPageAnchor } from '../../../src/composites';
import { Slider, Toggle } from '../../../src/primitives';

interface SampleSettings {
  restore: boolean;
  updates: boolean;
  tray: boolean;
  closeToTray: boolean;
  volume: number;
  muteAway: boolean;
}

type SampleKey = keyof SampleSettings;

const DEFAULTS: SampleSettings = { restore: true, updates: true, tray: false, closeToTray: false, volume: 80, muteAway: false };

const CHANGED: SampleSettings = { ...DEFAULTS, updates: false, volume: 55 };

const WINDOW_KEYS: readonly SampleKey[] = ['restore', 'updates', 'tray', 'closeToTray'];

const SOUND_KEYS: readonly SampleKey[] = ['volume', 'muteAway'];

const SETTINGS_ANCHORS: readonly SettingsPageAnchor[] = [
  { id: 'window', label: 'Window' },
  { id: 'sound', label: 'Sound' },
];

type Patch = (patch: Partial<SampleSettings>) => void;

interface SampleState {
  s: SampleSettings;
  set: Patch;
}

const toggle = (state: SampleState, key: SampleKey, label: string, description?: string) => ({
  key,
  content: <Toggle checked={state.s[key] === true} onChange={(v) => state.set({ [key]: v })} label={label} description={description} />,
});

const buildSections = (state: SampleState, changed: (keys: readonly SampleKey[]) => number): SettingsGroupListSection[] => {
  const { s, set } = state;
  return [
    {
      id: 'window',
      title: 'Window',
      changedCount: changed(WINDOW_KEYS),
      onReset: () => set(Object.fromEntries(WINDOW_KEYS.map((k) => [k, DEFAULTS[k]]))),
      groups: [
        {
          id: 'window-startup',
          title: 'Startup',
          rows: [toggle(state, 'restore', 'Open the last screen on launch'), toggle(state, 'updates', 'Check for updates', 'Once a day, in the background.')],
        },
        {
          id: 'window-tray',
          title: 'Tray',
          rows: [
            toggle(state, 'tray', 'Show a tray icon'),
            { ...toggle(state, 'closeToTray', 'Close to the tray'), lock: s.tray ? null : 'Turn on the tray icon first' },
          ],
        },
      ],
    },
    {
      id: 'sound',
      title: 'Sound',
      changedCount: changed(SOUND_KEYS),
      onReset: () => set(Object.fromEntries(SOUND_KEYS.map((k) => [k, DEFAULTS[k]]))),
      groups: [{
        rows: [
          { key: 'volume', content: <Slider label="Volume" value={s.volume} min={0} max={100} showValue onChange={(v) => set({ volume: v })} /> },
          toggle(state, 'muteAway', 'Mute while the window is in the background'),
        ],
      }],
    },
  ];
};

const useSettingsSample = (): SettingsGroupListSection[] => {
  const [settings, setSettings] = useState(CHANGED);
  const set: Patch = (patch) => setSettings((prev) => ({ ...prev, ...patch }));
  const changed = (keys: readonly SampleKey[]): number => keys.filter((k) => settings[k] !== DEFAULTS[k]).length;
  return buildSections({ s: settings, set }, changed);
};

export { SETTINGS_ANCHORS, useSettingsSample };
