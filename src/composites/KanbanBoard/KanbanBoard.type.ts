/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import type { CardTone } from '../../primitives/Card';
import type { ReorderDrag } from '../reorder/reorder.type';

type KanbanColumnWidth = 'fixed' | 'fill';

type KanbanColumnHeight = 'stretch' | 'fit';

interface KanbanCardData {
  id: string;
  group?: string;
}

interface KanbanColumn<Card extends KanbanCardData = KanbanCardData> {
  id: string;
  title: string;
  header?: ReactNode;
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
  above?: string;
  below?: string;
}

interface KanbanGroupFold {
  open: boolean;
  toggle: () => void;
  controls: string;
}

type KanbanCardFrameMode = 'card' | 'none';

interface KanbanCardFrame {
  edgeTone: CardTone | undefined;
}

interface KanbanBoardProps<Card extends KanbanCardData = KanbanCardData> {
  columns: readonly KanbanColumn<Card>[];
  renderCard: (card: Card, frame: KanbanCardFrame) => ReactNode;
  onMove: (move: KanbanMove) => void;
  onCardOpen?: (cardId: string) => void;
  renderGroupHeader?: (group: string, column: KanbanColumn<Card>, fold: KanbanGroupFold) => ReactNode;
  cardLabel?: (card: Card) => string;
  cardEdgeTone?: (card: Card) => CardTone | undefined;
  cardFrame?: KanbanCardFrameMode;
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
  renderCard: (card: Card, frame: KanbanCardFrame) => ReactNode;
  renderGroupHeader: ((group: string, column: KanbanColumn<Card>, fold: KanbanGroupFold) => ReactNode) | undefined;
  cardLabel: (card: Card) => string;
  cardEdgeTone: ((card: Card) => CardTone | undefined) | undefined;
  cardFrame: KanbanCardFrameMode;
  grip: boolean;
  foldable: boolean;
  drag: ReorderDrag;
  onCardKeyDown: (event: KeyboardEvent<HTMLElement>, card: Card) => void;
  onCardClick: (event: MouseEvent<HTMLElement>, card: Card) => void;
  onToggle: (columnId: string) => void;
  foldedGroups: readonly string[];
  onGroupToggle: (group: string) => void;
}

interface KanbanColumnProps<Card extends KanbanCardData> {
  column: KanbanColumn<Card>;
  index: number;
  collapsed: boolean;
  shared: KanbanShared<Card>;
}

interface KanbanLaneHeadProps<Card extends KanbanCardData> {
  column: KanbanColumn<Card>;
  toggle: ReactNode;
}

interface KanbanRun<Card extends KanbanCardData> {
  group: string | undefined;
  cards: { card: Card; at: number }[];
}

type KanbanFramePart = 'first' | 'middle' | 'last' | 'only';

interface KanbanGroupFrameProps<Card extends KanbanCardData> {
  group: string;
  column: KanbanColumn<Card>;
  listId: string;
  shared: KanbanShared<Card>;
}

interface KanbanCardProps<Card extends KanbanCardData> {
  card: Card;
  frame?: { group: string; part: KanbanFramePart; column: KanbanColumn<Card>; listId: string } | undefined;
  slot: number;
  last: boolean;
  shared: KanbanShared<Card>;
}

interface KanbanCardFaceProps<Card extends KanbanCardData> {
  card: Card;
  slot: number;
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
  CardPlace, KanbanBoardProps, KanbanCardData, KanbanCardFaceProps, KanbanCardFrame, KanbanCardFrameMode, KanbanCardProps, KanbanColumn, KanbanColumnHeight, KanbanColumnProps, KanbanColumnWidth, KanbanFramePart, KanbanGroupFold, KanbanGroupFrameProps, KanbanLaneHeadProps, KanbanMove, KanbanPlace, KanbanRun, KanbanShared,
  KanbanToggleProps,
};
