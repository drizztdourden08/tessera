/* @layer renderer-components @kind types */
import type { SplitOrientation } from '../../SplitPane/SplitPane.type';
import type { FoldSide, HandleFold, ResizeHandleEdge } from '../ResizeHandle.type';

type KeyAction =
  | { kind: 'move'; to: number }
  | { kind: 'reset' }
  | { kind: 'fold'; side: FoldSide }
  | { kind: 'unfold'; side: FoldSide; to: number }
  | null;

interface KeyRules {
  min: number;
  max: number;
  step: number;
  largeStep: number;
  orientation: SplitOrientation;
  edge: ResizeHandleEdge;
  canReset: boolean;
  fold?: HandleFold;
}

interface KeyPress {
  key: string;
  shiftKey: boolean;
  currentTarget: Element;
}

export type { KeyAction, KeyPress, KeyRules };
