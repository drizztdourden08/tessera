/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

const guideStatus = (title: string, snapping: boolean, showSnapping: boolean, words: TesseraStrings['widgets']): string =>
  (showSnapping ? words.guideAnnounce(title, snapping) : title);

export { guideStatus };
