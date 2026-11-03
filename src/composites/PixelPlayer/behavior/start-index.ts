/* @layer renderer-components @kind util */
import type { PixelPlayerDirection, PlayRange } from '../PixelPlayer.type';

const startIndex = (range: PlayRange, direction: PixelPlayerDirection): number => (direction === 'reverse' ? range.to : range.from);

export { startIndex };
