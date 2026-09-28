/* @layer renderer-components @kind logic */
import type { GroupedRow } from './types';

const flattenGroups = <T>(grouped: readonly GroupedRow<T>[]): readonly T[] =>
  grouped.flatMap((node) => (node.kind === 'row' ? [node.row] : flattenGroups(node.children)));

export { flattenGroups };
