/* @layer renderer-components @kind logic */
import type { LogPanelHeight } from '../LogPanel.type';

const logPanelClass = (height: LogPanelHeight | undefined, className: string | undefined): string => [
  'log-panel',
  height === 'fill' && 'log-panel--fill',
  typeof height === 'number' && 'log-panel--fixed',
  className,
].filter(Boolean).join(' ');

export { logPanelClass };
