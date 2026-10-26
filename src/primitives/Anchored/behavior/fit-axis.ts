/* @layer renderer-components @kind util */
import type { FitSpan } from './fit-in-view.type';

const fits = (span: FitSpan, room: number, margin: number): boolean => span.lo >= margin && span.hi <= room - margin;

const fitAxis = (span: FitSpan, anchor: FitSpan, room: number, margin: number): number => {
  if (fits(span, room, margin)) return 0;
  const size = span.hi - span.lo;
  const mirrored = anchor.lo + anchor.hi - span.hi;
  if (fits({ lo: mirrored, hi: mirrored + size }, room, margin)) return mirrored - span.lo;
  const last = Math.max(margin, room - margin - size);
  return Math.min(Math.max(span.lo, margin), last) - span.lo;
};

export { fitAxis };
