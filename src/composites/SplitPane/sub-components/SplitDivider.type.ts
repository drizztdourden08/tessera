/* @layer renderer-components @kind types */
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { CollapsedSide, SplitOrientation } from '../SplitPane.type';

interface SplitDividerHandlers {
  handlePointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  endDrag: (event: ReactPointerEvent<HTMLDivElement>) => void;
  handleKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void;
  expand: () => void;
}

interface SplitDividerProps {
  collapsed: CollapsedSide;
  orientation: SplitOrientation;
  startShare: number;
  valueRange: { min: number; max: number };
  startLabel: string;
  endLabel: string;
  handlers: SplitDividerHandlers;
}

export type { SplitDividerProps };
