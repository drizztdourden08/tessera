/* @layer renderer-components @kind types */
import type { CornerHandle, CornerTurn } from '../behavior/corner.type';

interface DockCornerHandleProps {
  handle: CornerHandle;
  label: string;
  hint: string;
  onTurn: (handle: CornerHandle, turn: CornerTurn) => void;
}

export type { DockCornerHandleProps };
