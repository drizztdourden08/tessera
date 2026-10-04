/* @layer stories @kind data */
import type { RowGridDensity } from './RowGrid.type';

const COLUMN_MIN = 160;

const GAP = 8;

const HANDLE = 24;

const NUMBER = 24;

const BUTTON_GAP = 2;

const FRAME = 2;

const BUTTON: Readonly<Record<RowGridDensity, number>> = { comfortable: 32, compact: 28 };

const BUTTON_TOKEN: Readonly<Record<RowGridDensity, string>> = { comfortable: 'var(--size-32)', compact: 'var(--control-h-sm)' };

const PAD: Readonly<Record<RowGridDensity, number>> = { comfortable: 24, compact: 16 };

const CONTROL_SIZE: Readonly<Record<RowGridDensity, 'md' | 'sm'>> = { comfortable: 'md', compact: 'sm' };

const TRACKS_PROPERTY = '--row-grid-tracks';

const MAX_PROPERTY = '--row-grid-max';

export {
  BUTTON, BUTTON_GAP, BUTTON_TOKEN, COLUMN_MIN, CONTROL_SIZE, FRAME, GAP, HANDLE, MAX_PROPERTY, NUMBER, PAD, TRACKS_PROPERTY,
};
