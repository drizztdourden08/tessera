/* @layer renderer-components @kind types */
import type { Rect } from '../DockLayout.type';
import type { CornerHandle, CornerTurn, CornerZone } from '../behavior/corner.type';

interface DockCornerZoneProps {
  zone: CornerZone;
  origin: Rect;
  hint: string;
  onTurn: (handle: CornerHandle, turn: CornerTurn) => void;
}

export type { DockCornerZoneProps };
