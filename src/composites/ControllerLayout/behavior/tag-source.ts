/* @layer renderer-components @kind logic */
import { isActive, stickMoved } from './slot-state';
import { stickClickState } from './stick-click';
import type { ControllerPlace, ControllerSlotState, ControllerSlots } from '../ControllerLayout.type';

interface TagSource {
  state: ControllerSlotState | undefined;
  active: boolean;
}

const hasContent = (state: ControllerSlotState | undefined): boolean =>
  state !== undefined && ((state.glyph !== undefined && state.glyph !== null) || (state.label !== undefined && state.label !== ''));

const tagSource = (place: ControllerPlace, slots: ControllerSlots): TagSource => {
  const state = slots[place.id];
  if (place.kind !== 'stick') return { state, active: isActive(state) };
  const click = stickClickState(slots, place.id);
  return { state: hasContent(state) ? state : click, active: stickMoved(state) || isActive(click) };
};

export { tagSource };
