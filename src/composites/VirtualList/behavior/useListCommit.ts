/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { listPosition } from './list-position';
import { listStays } from './list-stays';
import type { ListCommit, UseListCommitInput } from './useListCommit.type';

const useListCommit = <T,>(input: UseListCommitInput<T>): ListCommit => {
  const { reorder, keys } = input;
  const { lists } = useTesseraStrings();
  const [message, setMessage] = useState('');
  const wanted = useRef<string | null>(null);

  const commit: ListCommit['commit'] = (moving, to, modifier) => {
    if (!reorder || moving.length === 0 || listStays(keys, moving, to)) return;
    const move = { keys: moving, to, modifier };
    if (reorder.canDrop && !reorder.canDrop(move)) {
      setMessage(lists.moveRefused);
      return;
    }
    reorder.onMove(move);
    wanted.current = moving[0] ?? null;
    setMessage(lists.itemsMoved(moving.length, listPosition(keys, moving, to), keys.length));
  };

  return { commit, message, wanted };
};

export { useListCommit };
