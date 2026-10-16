/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface UndoStep {
  label: string;
  undo: () => void;
  expires?: number;
  within?: RefObject<HTMLElement | null>;
}

interface UndoEntry {
  step: UndoStep;
  drop: () => void;
}

interface UndoStack {
  push: (step: UndoStep) => () => void;
  undo: () => boolean;
  latest: () => string | null;
}

export type { UndoEntry, UndoStack, UndoStep };
