/* @layer stories @kind logic */
import type { LogEntry } from './virtual-list-samples.constants';

const moveEntries = (entries: readonly LogEntry[], keys: readonly string[], to: number): readonly LogEntry[] => {
  const moving = new Set(keys);
  const head = entries.slice(0, to).filter((entry) => !moving.has(entry.id));
  const tail = entries.slice(to).filter((entry) => !moving.has(entry.id));
  return [...head, ...entries.filter((entry) => moving.has(entry.id)), ...tail];
};

export { moveEntries };
