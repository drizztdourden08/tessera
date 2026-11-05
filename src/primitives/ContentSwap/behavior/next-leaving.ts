/* @layer renderer-components @kind helper */
import type { ContentSwapLayer } from '../ContentSwap.type';

const nextLeaving = (
  current: ContentSwapLayer | null,
  previous: ContentSwapLayer,
  outIn: boolean,
): ContentSwapLayer => (outIn && current ? current : previous);

export { nextLeaving };
