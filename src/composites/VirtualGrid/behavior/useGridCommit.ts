/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { moveSet } from '../../reorder/move-set';
import { gridMoveStays } from './grid-move-stays';
import type { ReorderModifier } from '../../reorder';
import type { GridTarget } from './grid-point-at.type';
import type { GridCommit, UseGridCommitInput } from './useGridCommit.type';

const useGridCommit = <T,>(input: UseGridCommitInput<T>): GridCommit => {
  const { reorder, sections, keys, owners, indexOfKey } = input;
  const { lists } = useTesseraStrings();
  const [message, setMessage] = useState('');
  const wanted = useRef<string | null>(null);

  const into = (moving: readonly string[], section: string) => {
    const found = sections?.find((entry) => entry.key === section);
    found?.onDrop?.(moving);
    setMessage(lists.itemsMovedInto(moving.length, typeof found?.label === 'string' ? found.label : section));
  };

  const gap = (moving: readonly string[], index: number, section: string | undefined, modifier: ReorderModifier) => {
    if (gridMoveStays({ keys, moving, index, section, owners, indexOfKey })) return;
    reorder?.onMove({ keys: moving, to: { index, section }, modifier });
    wanted.current = moving[0] ?? null;
    setMessage(lists.itemsMoved(moving.length, moveSet(keys, moving, index).indexOf(moving[0] ?? '') + 1, keys.length));
  };

  const commit = (moving: readonly string[], to: GridTarget, modifier: ReorderModifier) => {
    if (!reorder || moving.length === 0) return;
    if (to.kind === 'into') into(moving, to.section);
    else gap(moving, to.index, to.section, modifier);
  };

  return { commit, message, wanted, announce: setMessage };
};

export { useGridCommit };
