/* @layer renderer-components @kind types */
import type { CornerHandle, CornerTurn, CornerZone } from './corner.type';

interface CornerTurns {
  handles: CornerHandle[];
  zones: CornerZone[];
  message: string;
  hint: string;
  labelFor: (handle: CornerHandle) => string;
  turn: (handle: CornerHandle, how: CornerTurn) => void;
}

export type { CornerTurns };
