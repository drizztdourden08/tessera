/* @layer renderer-components @kind logic */
import { groupUid } from './group-uid';
import type { GroupedRow } from '../../../data/table/types';
import type { DefaultExpanded } from '../DataTable.type';

const opensOnStart = (rule: DefaultExpanded | undefined, key: string, path: string): boolean => {
  if (rule === undefined) return true;
  return typeof rule === 'function' ? rule(key, path) : rule.includes(key);
};

const collectGroupUids = (
  nodes: readonly GroupedRow<unknown>[],
  rule?: DefaultExpanded,
  parentUid = '',
): readonly string[] =>
  nodes.flatMap((node) => {
    if (node.kind === 'row') return [];
    const uid = groupUid(parentUid, node.path, node.key);
    const below = collectGroupUids(node.children, rule, uid);
    return opensOnStart(rule, node.key, node.path) ? [uid, ...below] : below;
  });

export { collectGroupUids };
