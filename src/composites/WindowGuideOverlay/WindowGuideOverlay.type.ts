/* @layer renderer-components @kind types */
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
  className?: string;
}

interface WindowGuideCardProps {
  mode: WindowGuideMode;
  title: string;
  snapping: boolean;
  hints: readonly WindowGuideHint[];
}

export type { WindowGuideCardProps, WindowGuideHint, WindowGuideMode, WindowGuideOverlayProps };
