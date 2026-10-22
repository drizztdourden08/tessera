/* @layer renderer-components @kind logic */
import type { ControllerSlotId, ControllerSlotState, ControllerSlots } from '../ControllerLayout.type';

const stickClick = (id: ControllerSlotId): ControllerSlotId | null => {
  if (id === 'stick.left') return 'stick.left.click';
  if (id === 'stick.right') return 'stick.right.click';
  return null;
};

const stickClickState = (slots: ControllerSlots, id: ControllerSlotId): ControllerSlotState | undefined => {
  const clickId = stickClick(id);
  return clickId ? slots[clickId] : undefined;
};

export { stickClick, stickClickState };
