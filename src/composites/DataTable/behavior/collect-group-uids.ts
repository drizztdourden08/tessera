/* @layer renderer-components @kind logic */
import { groupUid } from './group-uid';
import type { GroupedRow } from '../../../data/table/types';

const collectGroupUids = (nodes: readonly GroupedRow<unknown>[], parentUid = ''): readonly string[] =>
  nodes.flatMap((node) => {
    if (node.kind === 'row') return [];
    const uid = groupUid(parentUid, node.path, node.key);
    return [uid, ...collectGroupUids(node.children, uid)];
  });

export { collectGroupUids };
