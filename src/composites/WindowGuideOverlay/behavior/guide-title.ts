/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { WindowGuideMode } from '../WindowGuideOverlay.type';

const guideTitle = (mode: WindowGuideMode, words: TesseraStrings['widgets'], custom?: string): string => {
  if (custom !== undefined) return custom;
  return mode === 'moving' ? words.guideMoving : words.guideResizing;
};

export { guideTitle };
