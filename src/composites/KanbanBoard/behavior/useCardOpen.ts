/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import type { KanbanCardData } from '../KanbanBoard.type';
import { isInteractiveTarget } from './is-interactive-target';

const useCardOpen = <Card extends KanbanCardData>(dragging: number | null, onCardOpen: ((cardId: string) => void) | undefined) => {
  const wasDragged = useRef(false);

  useEffect(() => {
    if (dragging !== null) {
      wasDragged.current = true;
      return undefined;
    }
    const timer = setTimeout(() => {
      wasDragged.current = false;
    }, 0);
    return () => clearTimeout(timer);
  }, [dragging]);

  return (event: MouseEvent<HTMLElement>, card: Card): void => {
    if (!onCardOpen || wasDragged.current || isInteractiveTarget(event.target)) return;
    onCardOpen(card.id);
  };
};

export { useCardOpen };
