/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { TOGGLE_ATTRIBUTE } from '../KanbanBoard.constants';
import type { KanbanBoardProps } from '../KanbanBoard.type';

const useCollapsedColumns = (boardRef: RefObject<HTMLElement | null>, props: Pick<KanbanBoardProps, 'collapsed' | 'defaultCollapsed' | 'onCollapsedChange'>) => {
  const { collapsed, defaultCollapsed = [], onCollapsedChange } = props;
  const [own, setOwn] = useState(defaultCollapsed);
  const refocus = useRef<string | null>(null);
  const shown = collapsed ?? own;
  useLayoutEffect(() => {
    const id = refocus.current;
    if (id === null) return;
    refocus.current = null;
    [...(boardRef.current?.querySelectorAll<HTMLElement>(`[${TOGGLE_ATTRIBUTE}]`) ?? [])].find((toggle) => toggle.getAttribute(TOGGLE_ATTRIBUTE) === id)?.focus();
  });
  const toggle = (columnId: string): void => {
    const now = !shown.includes(columnId);
    refocus.current = columnId;
    setOwn(now ? [...shown, columnId] : shown.filter((id) => id !== columnId));
    onCollapsedChange?.(columnId, now);
  };
  return { shown, toggle };
};

export { useCollapsedColumns };
