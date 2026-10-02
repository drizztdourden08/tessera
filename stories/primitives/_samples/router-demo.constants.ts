/* @layer stories @kind data */
import type { RouterDemoRoute } from './RouterDemo.type';

const NAV_ROUTES: readonly RouterDemoRoute[] = [
  { to: '/saves', label: 'Saves' },
  { to: '/saves/slot-2', label: 'Slot 2' },
  { to: '/settings', label: 'Settings' },
];

const START_PATH = '/';

export { NAV_ROUTES, START_PATH };
