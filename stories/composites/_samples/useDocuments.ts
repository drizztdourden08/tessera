/* @layer stories @kind hook */
import { useRef, useState } from 'react';
import type { DocumentTab } from '../../../src/composites';
import { moveInList } from './move-in-list';

const useDocuments = (initial: readonly DocumentTab[]) => {
  const [tabs, setTabs] = useState(initial);
  const [activeId, setActiveId] = useState(initial[0]?.id);
  const added = useRef(0);
  const close = (id: string): void => {
    const index = tabs.findIndex((tab) => tab.id === id);
    const rest = tabs.filter((tab) => tab.id !== id);
    setTabs(rest);
    if (id === activeId) setActiveId(rest[Math.min(index, rest.length - 1)]?.id);
  };
  const add = (): void => {
    added.current += 1;
    const id = `new-${String(added.current)}`;
    setTabs((list) => [...list, { id, title: `untitled-${String(added.current)}.bxl`, icon: 'image' }]);
    setActiveId(id);
  };
  return {
    tabs,
    activeId,
    activate: setActiveId,
    close,
    add,
    move: (from: number, to: number) => setTabs((list) => moveInList(list, from, to)),
  };
};

export { useDocuments };
