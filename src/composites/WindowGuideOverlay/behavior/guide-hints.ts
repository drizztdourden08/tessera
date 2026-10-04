/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { WindowGuideHint, WindowGuideMode } from '../WindowGuideOverlay.type';

const guideHints = (mode: WindowGuideMode, words: TesseraStrings['widgets']): WindowGuideHint[] =>
  (mode === 'moving'
    ? [{ keys: ['ctrl'], label: words.guideMoveFree }]
    : [{ keys: ['ctrl'], label: words.guideResizeFree }, { keys: ['ctrl'], label: words.guideResizeAlone }]);

export { guideHints };
