/* @layer stories @kind data */
import type { WidgetChrome } from '../../../src/composites';

const DOCK_LABELS: Readonly<Record<string, string>> = {
  players: 'Players', log: 'Server log', hints: 'Hints', console: 'Console', elements: 'Elements', network: 'Network',
};

const DOCK_CHROMES: Readonly<Record<string, WidgetChrome>> = { log: 'compact', elements: 'none', network: 'none' };

const CHROMES_HINT = 'Players and Hints are full, the log is compact, and the Elements and Network kit has none: point at it for its grip, tabs and buttons.';

const FALLBACK_MAIN = { x: 0, y: 0, width: 640, height: 360 };

export { CHROMES_HINT, DOCK_CHROMES, DOCK_LABELS, FALLBACK_MAIN };
