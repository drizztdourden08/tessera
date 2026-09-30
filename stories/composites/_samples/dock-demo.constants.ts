/* @layer stories @kind data */
const DOCK_LABELS: Readonly<Record<string, string>> = { players: 'Players', log: 'Server log', hints: 'Hints', console: 'Console' };

const FALLBACK_MAIN = { x: 0, y: 0, width: 640, height: 360 };

export { DOCK_LABELS, FALLBACK_MAIN };
