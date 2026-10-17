/* @layer stories @kind data */
import type { SaveSlot } from './save-slots.type';

const SAVE_SLOTS: readonly SaveSlot[] = [
  { id: 'slot-1', name: 'Slot 1', meta: 'Kakariko Village, 2 minutes ago' },
  { id: 'slot-2', name: 'Slot 2', meta: 'Death Mountain, yesterday' },
  { id: 'slot-3', name: 'Slot 3', meta: 'Lake Hylia, 3 days ago' },
];

export { SAVE_SLOTS };
