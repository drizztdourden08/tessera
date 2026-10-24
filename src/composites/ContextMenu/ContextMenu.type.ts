/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MenuAlign, MenuBaseProps, MenuSide } from '../DropdownMenu';

interface ContextMenuPoint {
  x: number;
  y: number;
}

interface ContextMenuViewport {
  width: number;
  height: number;
}

interface ContextMenuPlacement {
  side: MenuSide;
  align: MenuAlign;
}

interface ContextMenuRect {
  left: number;
  bottom: number;
}

interface ContextMenuProps extends MenuBaseProps {
  children?: ReactNode;
  open?: boolean;
  point?: ContextMenuPoint;
  disabled?: boolean;
  longPress?: boolean;
  onOpen?: (point: ContextMenuPoint) => void;
  onClose?: () => void;
}

interface PointMenuProps {
  point: ContextMenuPoint;
  menu: MenuBaseProps;
  onClose: () => void;
}

export type { ContextMenuPlacement, ContextMenuPoint, ContextMenuProps, ContextMenuRect, ContextMenuViewport, PointMenuProps };
