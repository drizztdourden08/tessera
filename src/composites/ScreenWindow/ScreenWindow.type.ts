/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BackAction } from '../../primitives/action-data';
import type { ContentHeaderProps } from '../ContentHeader';
import type { Rect, Size } from '../rect-drag/rect-drag.type';
import type { ScreenLayerMove, ScreenLayerSize } from '../ScreenLayer';
import type { WindowCornerTitleProps } from './sub-components/WindowCornerTitle.type';

type ScreenWindowHeader = Pick<ContentHeaderProps, 'icon' | 'backdrop' | 'strip' | 'actions' | 'compact' | 'level' | 'live'>;

interface ScreenWindowProps {
  title: ReactNode;
  onClose: () => void;
  back?: BackAction;
  children: ReactNode;
  header?: ScreenWindowHeader;
  titleRow?: boolean;
  icon?: ReactNode;
  cornerTitle?: boolean;
  movable?: boolean;
  locked?: boolean;
  defaultLocked?: boolean;
  onLockChange?: (locked: boolean) => void;
  defaultRect?: Rect;
  onRectChange?: (rect: Rect) => void;
  minSize?: Size;
  storageKey?: string;
  subtitle?: ReactNode;
  extra?: ReactNode;
  floating?: ReactNode;
  hidden?: boolean;
  size?: ScreenLayerSize;
  square?: boolean;
  className?: string;
}

interface WindowName {
  bare: boolean;
  chip: WindowCornerTitleProps | undefined;
  label: string | undefined;
  named: boolean;
}

interface WindowLock {
  shown: boolean;
  locked: boolean;
  toggle: () => void;
  move: ScreenLayerMove | undefined;
}

export type { ScreenWindowHeader, ScreenWindowProps, WindowLock, WindowName };
