/* @layer renderer-components @kind logic */
import { SWEEP_ATTRIBUTE } from './toggle-sweep.constants';

const sweepKeyAt = (view: Window, x: number, y: number): string | undefined =>
  view.document.elementFromPoint(x, y)?.closest(`[${SWEEP_ATTRIBUTE}]`)?.getAttribute(SWEEP_ATTRIBUTE) ?? undefined;

export { sweepKeyAt };
