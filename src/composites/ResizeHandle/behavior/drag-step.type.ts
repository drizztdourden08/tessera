/* @layer renderer-components @kind types */
import type { FoldSide } from '../ResizeHandle.type';
import type { DragOrigin } from './drag-origin.type';

type DragOutcome =
  | { kind: 'resize'; to: number; from: number }
  | { kind: 'fold'; side: FoldSide }
  | { kind: 'unfold'; side: FoldSide; to: number }
  | null;

interface DragRules {
  min: number;
  max: number;
  sides: readonly FoldSide[];
}

interface DragStep {
  origin: DragOrigin;
  outcome: DragOutcome;
}

export type { DragOutcome, DragRules, DragStep };
