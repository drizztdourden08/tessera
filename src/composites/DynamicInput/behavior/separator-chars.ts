/* @layer renderer-components @kind util */
import type { PatternPart } from './parse-pattern.type';

const isSlot = (part: PatternPart): boolean => part.kind === 'slot';

const separatorChars = (parts: readonly PatternPart[], index: number): ReadonlySet<string> => {
  const at = parts.findIndex((part) => part.kind === 'slot' && part.index === index);
  if (at < 0) return new Set();
  const rest = parts.slice(at + 1);
  const until = rest.findIndex(isSlot);
  const between = until < 0 ? rest : rest.slice(0, until);
  return new Set(between.flatMap((part) => (part.kind === 'literal' ? [...part.text] : [])));
};

export { separatorChars };
