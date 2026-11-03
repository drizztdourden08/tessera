/* @layer renderer-components @kind util */
import { BACKWARD_START } from '../PixelPlayer.constants';
import type { PixelPlayerDirection, PlayRange } from '../PixelPlayer.type';

const startIndex = (range: PlayRange, direction: PixelPlayerDirection): number => (BACKWARD_START.includes(direction) ? range.to : range.from);

export { startIndex };
