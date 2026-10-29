/* @layer stories @kind types */
import type { SeatGridGap, SeatGridMinWidth } from '../../../src/composites';

type SeatGridArgs = {
  minWidth: SeatGridMinWidth;
  gap: SeatGridGap;
  seats: number;
};

export type { SeatGridArgs };
