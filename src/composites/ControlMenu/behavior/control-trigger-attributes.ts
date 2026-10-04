/* @layer renderer-components @kind util */
import type { ListboxDrop } from '../../../primitives/listbox/listbox-drop.type';

const controlTriggerAttributes = (drop: ListboxDrop<HTMLButtonElement>, panelId: string) => ({
  'aria-haspopup': 'dialog' as const,
  'aria-expanded': drop.open,
  'aria-controls': drop.open ? panelId : undefined,
  'data-drop': drop.open ? drop.attach : undefined,
  'data-fillet': (drop.open && drop.fillet) || undefined,
  'data-align': drop.open && drop.end ? 'end' : undefined,
});

export { controlTriggerAttributes };
