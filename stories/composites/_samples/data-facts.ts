/* @layer stories @kind data */
import type { FactsPanelGroup } from '../../../src/composites';

const PROFILE_FACTS: readonly FactsPanelGroup[] = [
  [
    { label: 'Game', value: 'A Link to the Past (USA).sfc', title: 'D:/roms/A Link to the Past (USA).sfc' },
    { label: 'Last played', value: '2 hours ago' },
    { label: 'Created', value: 'Sep 12' },
  ],
  [
    { label: 'Seed', value: 'K7Q2-M9XA', mono: true },
    { label: 'Server', value: 'mw.harbor.local:38281', mono: true },
    { label: 'Slot', value: 'Link' },
  ],
];

const BUILD_FACTS: readonly FactsPanelGroup[] = [
  [
    { label: 'Version', value: '1.4.0', mono: true },
    { label: 'Channel', value: 'Beta' },
    { label: 'Built', value: 'Sep 28' },
  ],
];

const SERVER_FACTS: readonly FactsPanelGroup[] = [
  [
    { label: 'Local', value: '127.0.0.1:38281', mono: true, copyable: true },
    { label: 'Seed', value: '2193847561', mono: true, copyable: true },
    { label: 'Uptime', value: '4 min' },
  ],
];

export { BUILD_FACTS, PROFILE_FACTS, SERVER_FACTS };
