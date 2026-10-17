/* @layer stories @kind data */
import type { VolumeCase } from './volume-icon.type';

const VOLUME_CASES: Readonly<Record<string, VolumeCase>> = {
  '0%': { level: 0, muted: false },
  '25%': { level: 0.25, muted: false },
  '50%': { level: 0.5, muted: false },
  '75%': { level: 0.75, muted: false },
  '100%': { level: 1, muted: false },
  'Muted at 75%': { level: 0.75, muted: true },
};

const VOLUME_CYCLE: readonly VolumeCase[] = [
  { level: 0.25, muted: false },
  { level: 0.5, muted: false },
  { level: 0.75, muted: false },
  { level: 1, muted: false },
  { level: 1, muted: true },
  { level: 1, muted: false },
  { level: 0.75, muted: false },
  { level: 0.5, muted: false },
  { level: 0.25, muted: false },
  { level: 0, muted: false },
];

const VOLUME_TICK_MS = 1100;

export { VOLUME_CASES, VOLUME_CYCLE, VOLUME_TICK_MS };
