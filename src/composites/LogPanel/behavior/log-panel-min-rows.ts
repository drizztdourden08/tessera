/* @layer renderer-components @kind function */
import { FILL_MIN_ROWS } from '../LogPanel.constants';
import type { LogPanelHeight } from '../LogPanel.type';

const logPanelMinRows = (height: LogPanelHeight | undefined, minRows: number | undefined): number | undefined => {
  if (minRows !== undefined) return Math.max(0, Math.floor(minRows));
  return height === 'fill' ? FILL_MIN_ROWS : undefined;
};

export { logPanelMinRows };
