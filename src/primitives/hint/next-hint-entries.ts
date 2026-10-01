/* @layer renderer-components @kind logic */
import type { Hint, HintEntry } from './hint.type';

const nextHintEntries = (entries: readonly HintEntry[], source: string, hint: Hint | null): readonly HintEntry[] => {
  const others = entries.filter((entry) => entry.source !== source);
  return hint === null ? others : [...others, { source, hint }];
};

export { nextHintEntries };
