/* @layer renderer-components @kind logic */
import { groupUid } from './group-uid';
import type { GroupedRow } from '../../../data/table/types';
import type { FlatItem, FlattenInput } from './flatten-rows.type';

const walk = <T>(input: FlattenInput<T>, nodes: readonly GroupedRow<T>[], parentUid: string, into: FlatItem<T>[]): void => {
  const { isExpanded, getRowId } = input;
  for (const node of nodes) {
    if (node.kind === 'row') {
      into.push({ kind: 'row', key: `r:${getRowId(node.row)}`, row: node.row });
      continue;
    }
    const uid = groupUid(parentUid, node.path, node.key);
    into.push({ kind: 'group', key: `g:${uid}`, uid, node });
    if (isExpanded(uid)) walk(input, node.children, uid, into);
  }
};

const flattenRows = <T>(input: FlattenInput<T>): readonly FlatItem<T>[] => {
  const items: FlatItem<T>[] = [];
  walk(input, input.nodes, '', items);
  return items;
};

export { flattenRows };
