/* @layer renderer-components @kind util */
import type { ListboxDrop } from '../../../primitives/listbox/listbox-drop.type';

const triggerAttributes = (drop: ListboxDrop<HTMLButtonElement>, menuId: string) => ({
  'aria-haspopup': 'menu' as const,
  'aria-expanded': drop.open,
  'aria-controls': drop.open ? menuId : undefined,
  'data-drop': drop.open ? drop.attach : undefined,
  'data-fillet': (drop.open && drop.fillet) || undefined,
});

export { triggerAttributes };
