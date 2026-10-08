/* @layer renderer-components @kind logic */
import { ESCAPE_RANK } from './escape-stack.constants';
import type { EscapeEntry } from './escape-stack.type';

const takes = (entry: EscapeEntry, target: EventTarget | null | undefined): boolean =>
  target === undefined || entry.holds === undefined || entry.holds(target);

const topEscape = (entries: readonly EscapeEntry[], target?: EventTarget | null): EscapeEntry | undefined =>
  entries.filter((entry) => takes(entry, target)).reduce<EscapeEntry | undefined>(
    (top, entry) => (top === undefined || ESCAPE_RANK[entry.level] >= ESCAPE_RANK[top.level] ? entry : top),
    undefined,
  );

export { topEscape };
