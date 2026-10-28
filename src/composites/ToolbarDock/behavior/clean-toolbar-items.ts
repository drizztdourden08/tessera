/* @layer renderer-components @kind logic */
import { isRecord } from './is-record';

const hiddenIds = (raw: unknown): string[] =>
  (Array.isArray(raw) ? [...new Set(raw.filter((id): id is string => typeof id === 'string' && id.length > 0))] : []);

const cleanToolbarItems = (raw: unknown, known: ReadonlySet<string>): { items?: Record<string, string[]> } => {
  if (!isRecord(raw)) return {};
  const items: Record<string, string[]> = {};
  for (const [id, list] of Object.entries(raw)) {
    const ids = known.has(id) ? hiddenIds(list) : [];
    if (ids.length > 0) items[id] = ids;
  }
  return Object.keys(items).length > 0 ? { items } : {};
};

export { cleanToolbarItems };
