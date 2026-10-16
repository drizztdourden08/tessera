/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useUndo } from '../../../primitives/undo-stack/useUndo';
import type { ItemListProps } from '../ItemList.type';

const useItemListUndo = <T,>(
  props: ItemListProps<T>, pending: readonly string[], restore: (id: string) => void, listRef: RefObject<HTMLElement | null>,
): void => {
  const { items, getId, getName } = props;
  const { lists } = useTesseraStrings();
  const { push } = useUndo();
  const held = useRef(new Map<string, () => void>());
  const latest = useRef({ restore, labelOf: (id: string) => id });
  latest.current = {
    restore,
    labelOf: (id) => {
      const item = items.find((one) => getId(one) === id);
      return lists.undoDeleteOf(item === undefined ? id : getName(item));
    },
  };

  useEffect(() => {
    const map = held.current;
    map.forEach((drop, id) => {
      if (pending.includes(id)) return;
      map.delete(id);
      drop();
    });
    pending.filter((id) => !map.has(id)).forEach((id) => {
      map.set(id, push({ label: latest.current.labelOf(id), undo: () => latest.current.restore(id), within: listRef }));
    });
  }, [pending, push, listRef]);

  useEffect(() => {
    const map = held.current;
    return () => {
      map.forEach((drop) => drop());
      map.clear();
    };
  }, []);
};

export { useItemListUndo };
