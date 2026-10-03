/* @layer stories @kind data */
import type { FactsPanelGroup } from '../../../src/composites';

const ABOUT_FACTS: readonly FactsPanelGroup[] = [
  [
    { label: 'Version', value: '0.9.2', mono: true },
    { label: 'Platform', value: 'windows' },
  ],
  [
    { label: 'Runtime', value: 'Electron 38.1.0', mono: true },
    { label: 'Engine', value: 'Chromium 140.0.7339.80', mono: true },
  ],
];

const ABOUT_DEBUG = 'Relic of the Past 0.9.2, windows, Electron 38.1.0, Chromium 140.0.7339.80';

export { ABOUT_DEBUG, ABOUT_FACTS };
