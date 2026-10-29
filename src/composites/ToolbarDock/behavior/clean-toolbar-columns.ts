/* @layer renderer-components @kind logic */
import type { ToolbarColumns } from '../../Toolbar/Toolbar.type';
import { isRecord } from './is-record';
import { isToolbarColumns } from './is-toolbar-columns';

const cleanToolbarColumns = (raw: unknown, known: ReadonlySet<string>): { columns?: Record<string, ToolbarColumns> } => {
  if (!isRecord(raw)) return {};
  const columns: Record<string, ToolbarColumns> = {};
  for (const [id, count] of Object.entries(raw)) {
    if (known.has(id) && isToolbarColumns(count)) columns[id] = count;
  }
  return Object.keys(columns).length > 0 ? { columns } : {};
};

export { cleanToolbarColumns };
