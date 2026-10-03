/* @layer renderer-components @kind logic */
import type { LogRow } from '../LogPanel.type';

const logAsText = (rows: readonly LogRow[]): string =>
  rows.map((row) => `${row.gutter} [${row.tag}] ${'  '.repeat(row.indent ?? 0)}${row.message}`).join('\n');

export { logAsText };
