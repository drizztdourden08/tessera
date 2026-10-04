/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ShortcutKey } from '../../primitives/Shortcut/Shortcut.type';

type WindowGuideMode = 'moving' | 'resizing';

interface WindowGuideHint {
  keys: readonly ShortcutKey[];
  label: string;
}

interface WindowGuideOverlayProps {
  open: boolean;
  mode: WindowGuideMode;
  snapping: boolean;
  hints?: readonly WindowGuideHint[];
  defaultHints?: boolean;
  pointer?: WindowGuidePointer | null;
  className?: string;
}

interface WindowGuidePointer {
  x: number;
  y: number;
}

interface WindowGuideBesideProps {
  pointer: WindowGuidePointer;
  children: ReactNode;
}

interface WindowGuideCardProps {
  mode: WindowGuideMode;
  title: string;
  snapping: boolean;
  hints: readonly WindowGuideHint[];
}

export type { WindowGuideBesideProps, WindowGuideCardProps, WindowGuideHint, WindowGuideMode, WindowGuideOverlayProps, WindowGuidePointer };
