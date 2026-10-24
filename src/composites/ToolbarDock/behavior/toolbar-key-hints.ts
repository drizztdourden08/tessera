/* @layer renderer-components @kind logic */
import type { WindowGuideHint } from '../../WindowGuideOverlay/WindowGuideOverlay.type';
import type { ToolbarWords } from './toolbar-key.type';

const toolbarKeyHints = (words: ToolbarWords): WindowGuideHint[] => [
  { keys: ['up'], label: words.hintSide(words.sides.top) },
  { keys: ['left'], label: words.hintSide(words.sides.left) },
  { keys: ['right'], label: words.hintSide(words.sides.right) },
  { keys: ['down'], label: words.hintSide(words.sides.bottom) },
  { keys: ['delete'], label: words.hintHide },
  { keys: ['enter'], label: words.hintDrop },
  { keys: ['esc'], label: words.hintCancel },
];

export { toolbarKeyHints };
