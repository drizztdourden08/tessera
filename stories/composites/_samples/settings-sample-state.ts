/* @layer stories @kind hook */
import { useState } from 'react';
import type { PatternValue, ShortcutKey } from '../../../src';

interface SampleSettings {
  restore: boolean;
  updates: boolean;
  language: string;
  tray: boolean;
  closeToTray: boolean;
  windowMode: string;
  scale: string;
  brightness: number;
  accent: string;
  startPage: string;
  volume: number;
  channels: string;
  buffer: number;
  alerts: readonly string[];
  quietFrom: PatternValue;
  search: readonly ShortcutKey[];
  mute: readonly ShortcutKey[];
  name: string;
  password: string;
  port: number;
  tags: readonly string[];
}

type SamplePatch = (patch: Partial<SampleSettings>) => void;

interface SampleState {
  s: SampleSettings;
  set: SamplePatch;
  reset: (keys: readonly (keyof SampleSettings)[]) => void;
  mark: (key: keyof SampleSettings) => { changed: boolean; onReset: () => void };
}

const SAMPLE_DEFAULTS: SampleSettings = {
  restore: true,
  updates: true,
  language: 'en',
  tray: false,
  closeToTray: false,
  windowMode: 'borderless',
  scale: '100',
  brightness: 50,
  accent: '#c8a84e',
  startPage: 'home',
  volume: 80,
  channels: '2',
  buffer: 2,
  alerts: ['joins'],
  quietFrom: { hh: 10, mm: 30, ampm: 'PM' },
  search: ['ctrl', 'K'],
  mute: ['ctrl', 'M'],
  name: 'mira',
  password: 'hunter22',
  port: 38281,
  tags: ['async', 'weekly'],
};

const STARTING: SampleSettings = { ...SAMPLE_DEFAULTS, updates: false, volume: 65, tray: true };

const useSampleSettings = (): SampleState => {
  const [s, setS] = useState(STARTING);
  const set: SamplePatch = (patch) => setS((prev) => ({ ...prev, ...patch }));
  const reset = (keys: readonly (keyof SampleSettings)[]) => set(Object.fromEntries(keys.map((key) => [key, SAMPLE_DEFAULTS[key]])));
  const mark = (key: keyof SampleSettings) => ({ changed: s[key] !== SAMPLE_DEFAULTS[key], onReset: () => reset([key]) });
  return { s, set, reset, mark };
};

export { useSampleSettings };
export type { SampleState };
