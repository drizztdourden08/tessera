/* @layer renderer-components @kind logic */
import type { FoldOverflow } from './fold-text.type';

const measures = (lines: number | undefined, overflow: FoldOverflow, open: boolean): boolean =>
  lines !== undefined && lines > 0 && overflow !== 'clip' && (overflow === 'hint' || !open);

export { measures };
