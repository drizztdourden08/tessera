/* @layer renderer-components @kind logic */
import type { SelectionAction, SelectionKeyEvent } from './selection.type';

const isHeld = (event: SelectionKeyEvent) => event.ctrlKey || event.metaKey;

const isSelectAll = (event: SelectionKeyEvent) => isHeld(event) && !event.altKey && event.key.toLowerCase() === 'a';

const spaceAction = (event: SelectionKeyEvent): SelectionAction => (event.shiftKey && !isHeld(event) ? 'range' : 'toggle');

const selectionAction = (event: SelectionKeyEvent): SelectionAction | undefined => {
  if (isSelectAll(event)) return 'all';
  if (event.altKey) return undefined;
  if (event.key === ' ') return spaceAction(event);
  if (event.key === 'Escape') return 'clear';
  return !isHeld(event) && event.key.length === 1 ? 'type' : undefined;
};

export { selectionAction };
