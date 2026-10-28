/* @layer renderer-components @kind logic */
import type { KeptKeys, KeptKeysInput } from './flatten-items.type';

const mark = <T,>(items: readonly T[], input: KeptKeysInput<T>, kept: Set<string>, forced: Set<string>): boolean => {
  let any = false;
  for (const item of items) {
    const key = input.getKey(item);
    const children = input.getChildren(item);
    const below = children ? mark(children, input, kept, forced) : false;
    if (below) forced.add(key);
    if (below || input.filter(item)) {
      kept.add(key);
      any = true;
    }
  }
  return any;
};

const keptKeysOf = <T,>(items: readonly T[], input: KeptKeysInput<T>): KeptKeys => {
  const kept = new Set<string>();
  const forced = new Set<string>();
  mark(items, input, kept, forced);
  return { kept, forced };
};

export { keptKeysOf };
