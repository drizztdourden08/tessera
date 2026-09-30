/* @layer stories @kind data */
import type { TesseraOverrides } from '../../../src/primitives';
import { MosaicSpinner } from './MosaicSpinner';

type SpinnerChoice = 'default' | 'mosaic';

const SPINNER_CHOICES: readonly SpinnerChoice[] = ['default', 'mosaic'];

const APP_OVERRIDES: Readonly<Record<SpinnerChoice, TesseraOverrides>> = {
  default: {},
  mosaic: { spinner: MosaicSpinner },
};

const SPINNER_OPTIONS = [
  { value: 'default' as const, label: 'Tessera ring' },
  { value: 'mosaic' as const, label: 'App mosaic' },
];

export { APP_OVERRIDES, SPINNER_CHOICES, SPINNER_OPTIONS };
export type { SpinnerChoice };
