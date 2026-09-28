/* @layer renderer-components @kind types */
import type { MouseEvent, RefObject } from 'react';

interface WidgetTitlebarProps {
  label: string;
  gearRef: RefObject<HTMLButtonElement | null>;
  onMouseDown?: (e: MouseEvent) => void;
  onToggleSettings: () => void;
  onClose: () => void;
}

export type { WidgetTitlebarProps };
