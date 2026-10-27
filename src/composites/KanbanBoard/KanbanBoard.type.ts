/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';
import type { CardTone } from '../../primitives/Card';
import type { ReorderDrag } from '../reorder/reorder.type';

type KanbanColumnWidth = 'fixed' | 'fill';

type KanbanColumnHeight = 'stretch' | 'fit';

interface KanbanCardData {
  id: string;
}

interface KanbanColumn<Card extends KanbanCardData = KanbanCardData> {
  id: string;
  title: string;
  cards: readonly Card[];
  badge?: ReactNode;
  action?: ReactNode;
  top?: ReactNode;
}

interface KanbanPlace {
  columnId: string;
  index: number;
}

interface KanbanMove {
  cardId: string;
  from: KanbanPlace;
  to: KanbanPlace;
}

interface KanbanBoardProps<Card extends KanbanCardData = KanbanCardData> {
  columns: readonly KanbanColumn<Card>[];
  renderCard: (card: Card) => ReactNode;
  onMove: (move: KanbanMove) => void;
  cardLabel?: (card: Card) => string;
  cardEdgeTone?: (card: Card) => CardTone | undefined;
  columnWidth?: KanbanColumnWidth;
  columnHeight?: KanbanColumnHeight;
  grip?: boolean;
  foldable?: boolean;
  stack?: boolean;
  label?: string;
  collapsed?: readonly string[];
  defaultCollapsed?: readonly string[];
  onCollapsedChange?: (columnId: string, collapsed: boolean) => void;
  className?: string;
}

interface KanbanShared<Card extends KanbanCardData> {
  columns: readonly KanbanColumn<Card>[];
  renderCard: (card: Card) => ReactNode;
  cardLabel: (card: Card) => string;
  cardEdgeTone: ((card: Card) => CardTone | undefined) | undefined;
  grip: boolean;
  foldable: boolean;
  drag: ReorderDrag;
  onCardKeyDown: (event: KeyboardEvent<HTMLElement>, card: Card) => void;
  onToggle: (columnId: string) => void;
}

interface KanbanColumnProps<Card extends KanbanCardData> {
  column: KanbanColumn<Card>;
  index: number;
  collapsed: boolean;
  shared: KanbanShared<Card>;
}

interface KanbanCardProps<Card extends KanbanCardData> {
  card: Card;
  slot: number;
  last: boolean;
  shared: KanbanShared<Card>;
}

interface KanbanToggleProps {
  columnId: string;
  title: string;
  collapsed: boolean;
  controls: string | undefined;
  onToggle: (columnId: string) => void;
}

interface CardPlace {
  column: number;
  index: number;
}

export type {
  CardPlace, KanbanBoardProps, KanbanCardData, KanbanCardProps, KanbanColumn, KanbanColumnHeight, KanbanColumnProps, KanbanColumnWidth, KanbanMove, KanbanPlace, KanbanShared,
  KanbanToggleProps,
};
