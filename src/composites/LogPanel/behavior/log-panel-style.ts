/* @layer renderer-components @kind function */
import type { CSSProperties } from 'react';
import type { LogPanelHeight } from '../LogPanel.type';
import { logPanelMinRows } from './log-panel-min-rows';

const logPanelStyle = (height: LogPanelHeight | undefined, minRows: number | undefined): CSSProperties | undefined => {
  const rows = logPanelMinRows(height, minRows);
  const style: Record<string, number> = {};
  if (typeof height === 'number') style.blockSize = height;
  if (rows !== undefined) style['--log-panel-min-rows'] = rows;
  return Object.keys(style).length === 0 ? undefined : style;
};

export { logPanelStyle };
