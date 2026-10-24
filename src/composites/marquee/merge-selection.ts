/* @layer renderer-components @kind logic */
import type { MarqueeModifiers } from './marquee.type';

const mergeSelection = (base: readonly string[], hits: readonly string[], modifiers: MarqueeModifiers): readonly string[] => {
  if (modifiers.toggle) {
    const hit = new Set(hits);
    const kept = base.filter((key) => !hit.has(key));
    const had = new Set(base);
    return [...kept, ...hits.filter((key) => !had.has(key))];
  }
  if (modifiers.add) {
    const had = new Set(base);
    return [...base, ...hits.filter((key) => !had.has(key))];
  }
  return hits;
};

export { mergeSelection };
