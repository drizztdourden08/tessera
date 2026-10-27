/* @layer renderer-components @kind types */
import type { DragEvent, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';

type ListItemRowRole = 'listitem' | 'row';

type ListItemRowActionVisibility = 'hover' | 'always';

type ListItemColumnAlign = 'start' | 'center' | 'end';

interface ListItemColumn {
  primary: ReactNode;
  secondary?: ReactNode;
  align?: ListItemColumnAlign;
}

interface ListItemRowProps {
  name: ReactNode;
  meta?: ReactNode;
  icon?: ReactNode;
  media?: ReactNode;
  mediaAspect?: number;
  mediaWidth?: number;
  nameAction?: ReactNode;
  columns?: readonly ListItemColumn[];
  action?: ReactNode;
  actionVisibility?: ListItemRowActionVisibility;
  selected?: boolean;
  tabIndex?: number;
  onClick?: () => void;
  onDoubleClick?: () => void;
  onContextMenu?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  draggable?: boolean;
  onDragStart?: (event: DragEvent<HTMLElement>) => void;
  onDragEnd?: (event: DragEvent<HTMLElement>) => void;
  role?: ListItemRowRole;
  data?: DataAttributes;
  className?: string;
}

interface ListItemHeaderColumn {
  label: ReactNode;
  align?: ListItemColumnAlign;
}

interface ListItemHeader {
  icon?: ReactNode;
  main?: ReactNode;
  columns?: readonly ListItemHeaderColumn[];
  action?: ReactNode;
}

interface ListItemListProps {
  children: ReactNode;
  header?: ListItemHeader;
  label?: string;
  heading?: ReactNode;
  count?: number;
  shape?: ListItemShape;
  className?: string;
}

interface ListItemShape {
  icon: boolean;
  columns: number;
  action: boolean;
}

export type {
  ListItemColumn, ListItemColumnAlign, ListItemHeader, ListItemHeaderColumn, ListItemListProps, ListItemRowActionVisibility, ListItemRowProps,
  ListItemRowRole, ListItemShape,
};
