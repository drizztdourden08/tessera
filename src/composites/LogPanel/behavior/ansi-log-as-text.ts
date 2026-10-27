/* @layer renderer-components @kind logic */
import type { LogRow } from '../LogPanel.type';
import { logAsText } from './log-as-text';
import { stripAnsi } from './strip-ansi';

const ansiLogAsText = (rows: readonly LogRow[]): string =>
  logAsText(rows.map((row) => ({ ...row, message: stripAnsi(row.message) })));

export { ansiLogAsText };
