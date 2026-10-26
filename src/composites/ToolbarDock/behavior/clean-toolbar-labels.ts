/* @layer renderer-components @kind logic */
import { isRecord } from './is-record';

const cleanToolbarLabels = (raw: unknown, known: ReadonlySet<string>): { labels?: Record<string, boolean> } => {
  if (!isRecord(raw)) return {};
  const labels: Record<string, boolean> = {};
  for (const [id, on] of Object.entries(raw)) {
    if (known.has(id) && typeof on === 'boolean') labels[id] = on;
  }
  return Object.keys(labels).length > 0 ? { labels } : {};
};

export { cleanToolbarLabels };
