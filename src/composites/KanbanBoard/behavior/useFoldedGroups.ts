/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { KanbanBoardProps } from '../KanbanBoard.type';

const useFoldedGroups = ({ foldedGroups, onFoldedGroupsChange }: Pick<KanbanBoardProps, 'foldedGroups' | 'onFoldedGroupsChange'>) => {
  const [own, setOwn] = useState<readonly string[]>([]);
  const folded = foldedGroups === undefined ? own : [...foldedGroups];
  const toggle = (group: string): void => {
    const next = folded.includes(group) ? folded.filter((key) => key !== group) : [...folded, group];
    if (foldedGroups === undefined) setOwn(next);
    onFoldedGroupsChange?.(next);
  };
  return { folded, toggle };
};

export { useFoldedGroups };
