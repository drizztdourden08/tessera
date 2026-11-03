/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { SIGNAL_KEY_ATTRIBUTE, SIGNAL_MORE_ATTRIBUTE } from '../SignalStrip.constants';
import type { SignalMeasure } from './signal-fit.type';

const recordWidths = (row: HTMLElement, measure: SignalMeasure): number => {
  row.querySelectorAll<HTMLElement>(`[${SIGNAL_KEY_ATTRIBUTE}]`).forEach((chip) => {
    measure.widths.set(chip.getAttribute(SIGNAL_KEY_ATTRIBUTE) ?? '', chip.getBoundingClientRect().width);
  });
  const more = row.querySelector<HTMLElement>(`[${SIGNAL_MORE_ATTRIBUTE}]`);
  if (more) measure.more = more.getBoundingClientRect().width;
  return Number.parseFloat(ownerWindowOf(row).getComputedStyle(row).columnGap) || 0;
};

export { recordWidths };
