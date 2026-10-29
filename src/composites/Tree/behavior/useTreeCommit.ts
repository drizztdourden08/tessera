/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { TreeMoveRequest } from '../Tree.type';
import type { TreeCommit, TreeCommitInput } from './useTreeDrag.type';

const useTreeCommit = <T,>(input: TreeCommitInput<T>): TreeCommit => {
  const { rows, indexOfKey, reorder, getLabel, childCount, setExpanded, jump } = input;
  const { lists } = useTesseraStrings();
  const [message, setMessage] = useState('');
  const wanted = useRef<string | null>(null);

  const commit = (request: TreeMoveRequest): void => {
    const parent = rows[indexOfKey.get(request.parentKey ?? '') ?? -1];
    const joined = request.keys.filter((key) => rows[indexOfKey.get(key) ?? -1]?.parentKey !== request.parentKey).length;
    const total = childCount(request.parentKey) + joined;
    setMessage(request.into && parent
      ? lists.itemsMovedInto(request.keys.length, getLabel(parent.item))
      : lists.itemsMoved(request.keys.length, request.index + 1, total));
    wanted.current = request.keys[0] ?? null;
    reorder?.onMove(request);
    if (request.into && request.parentKey !== null) setExpanded(request.parentKey, true);
  };

  useEffect(() => {
    const key = wanted.current;
    const at = key === null ? undefined : indexOfKey.get(key);
    if (at === undefined) return;
    wanted.current = null;
    jump(at);
  });

  return { commit, message };
};

export { useTreeCommit };
