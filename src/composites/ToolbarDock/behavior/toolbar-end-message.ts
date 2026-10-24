/* @layer renderer-components @kind logic */
import type { ToolbarKeyPick, ToolbarWords } from './toolbar-key.type';
import { toolbarLaneWord } from './toolbar-lane-word';

const toolbarEndMessage = (words: ToolbarWords, label: string, pick: ToolbarKeyPick | null, changed: boolean): string => {
  if (pick === null) return words.cancelled(label);
  if (pick.kind === 'basket') return words.hidden(label);
  if (!changed) return words.stayed(label);
  return words.movedTo(label, words.sides[pick.side], toolbarLaneWord(words, pick.index));
};

export { toolbarEndMessage };
