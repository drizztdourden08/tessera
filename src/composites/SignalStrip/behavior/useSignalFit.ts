/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { SIGNAL_KEY_JOIN } from '../SignalStrip.constants';
import type { SignalItem } from '../SignalStrip.type';
import { chipKey } from './chip-key';
import { fitCount } from './fit-count';
import { knownWidths } from './known-widths';
import { recordWidths } from './record-widths';
import type { SignalMeasure } from './signal-fit.type';

const useSignalFit = (rowRef: RefObject<HTMLElement | null>, items: readonly SignalItem[], max: number | undefined): number => {
  const total = items.length;
  const cap = max === undefined ? total : Math.min(Math.max(max, 0), total);
  const signature = items.map(chipKey).join(SIGNAL_KEY_JOIN);
  const [shown, setShown] = useState(cap);
  const [room, setRoom] = useState<number | null>(null);
  const measure = useRef<SignalMeasure>({ widths: new Map(), more: 0 });
  const filled = total > 0;

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;
    const read = () => setRoom(row.clientWidth);
    read();
    return observeResize([row], read);
  }, [rowRef, filled]);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row || room === null) return;
    const gap = recordWidths(row, measure.current);
    const widths = knownWidths(signature.split(SIGNAL_KEY_JOIN).slice(0, cap), measure.current.widths);
    setShown(widths === null ? cap : fitCount({ widths, gap, more: measure.current.more, room, capped: cap < total }));
  }, [rowRef, signature, cap, total, shown, room]);

  return Math.min(shown, cap);
};

export { useSignalFit };
