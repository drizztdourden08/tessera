/* @layer renderer-components @kind logic */
import type { ToolbarKeyNote, ToolbarWords } from './toolbar-key.type';
import { toolbarLaneWord } from './toolbar-lane-word';

const toolbarKeyMessage = (words: ToolbarWords, label: string, note: ToolbarKeyNote): string => {
  switch (note.kind) {
    case 'place': return words.place(label, words.sides[note.side], toolbarLaneWord(words, note.index));
    case 'slot': return words.slot(label, note.slot, note.count);
    case 'hide': return words.willHide(label);
  }
};

export { toolbarKeyMessage };
