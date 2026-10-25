/* @layer renderer-components @kind logic */
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarWords } from './toolbar-key.type';
import { toolbarCornerNote } from './toolbar-corner-note';
import { toolbarLabelIn } from './toolbar-label-in';
import { toolbarPushed } from './toolbar-pushed';

const toolbarResizeMessage = (
  words: ToolbarWords,
  definitions: readonly ToolbarDefinition[],
  change: { before: ToolbarLayout; after: ToolbarLayout; id: string },
): string => {
  const { before, after, id } = change;
  const label = toolbarLabelIn(definitions, id);
  const note = toolbarCornerNote(before, after, id);
  if (note) {
    const corner = note.corner.replace('-', ' ');
    return note.taken ? words.cornerTaken(label, corner) : words.cornerGiven(label, corner);
  }
  const pushed = toolbarPushed(before, after, id).map((other) => toolbarLabelIn(definitions, other));
  const done = words.resizeEnd(label);
  return pushed.length > 0 ? `${done}. ${words.pushed(label, pushed.join(', '))}` : done;
};

export { toolbarResizeMessage };
