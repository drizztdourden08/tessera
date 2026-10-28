/* @layer renderer-components @kind logic */
import type { MillerIntent, MillerIntentInput } from './useMillerColumns.type';

const goIn = <T,>(input: MillerIntentInput<T>): MillerIntent | undefined => {
  const { column, item, path, getKey, getChildren } = input;
  const first = getChildren(item)?.[0];
  if (first === undefined) return undefined;
  return {
    kind: 'go', selected: getKey(first), path: [...path.slice(0, column), getKey(item), getKey(first)], wanted: { column: column + 1, index: 0 },
  };
};

const goBack = <T,>(input: MillerIntentInput<T>): MillerIntent | undefined => {
  const { column, path, columns, getKey } = input;
  const parent = path[column - 1];
  if (column === 0 || parent === undefined) return undefined;
  const index = columns[column - 1]?.items.findIndex((entry) => getKey(entry) === parent) ?? 0;
  return { kind: 'go', selected: parent, path: path.slice(0, column), wanted: { column: column - 1, index: Math.max(0, index) } };
};

const millerIntentOf = <T,>(input: MillerIntentInput<T>): MillerIntent | undefined => {
  if (input.key === 'ArrowRight') return goIn(input);
  if (input.key === 'ArrowLeft') return goBack(input);
  return input.key === 'Enter' && input.getChildren(input.item) === undefined ? { kind: 'open' } : undefined;
};

export { millerIntentOf };
