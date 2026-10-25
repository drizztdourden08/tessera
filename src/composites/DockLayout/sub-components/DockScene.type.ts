/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { DockLayoutProps, DockMainGrip, LayoutEdit, LayoutNode, Rect, Size, WidgetId } from '../DockLayout.type';
import type { DragView } from '../behavior/drag.type';
import type { LaidOut } from '../behavior/layout-tree.type';

type DockSceneProps = Pick<DockLayoutProps, 'renderPane' | 'renderFloating'> & {
  laid: LaidOut;
  tree: LayoutNode;
  labelOf: (id: WidgetId) => string;
  mainRect: Rect | null;
  main: ReactNode;
  floating: DockLayoutProps['layout']['floating'];
  drag: DragView | null;
  ownDrag: DragView | null;
  dragId: WidgetId | null;
  stageRef: RefObject<HTMLElement | null>;
  onEdit: (edit: LayoutEdit) => void;
  mainLabel: string;
  gripLabel: string;
  mainGrip: DockMainGrip;
  floatingMin: Size;
  floatSnap: number;
  stage: Rect;
  peek: boolean;
};

export type { DockSceneProps };
