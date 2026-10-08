/* @layer renderer-components @kind logic */
import type { ChoiceRoom } from '../../../primitives/dom/choice-room.type';
import { CLOSED_SET_SELECTOR, OPEN_SET_SELECTOR } from '../sub-components/EnumEditorControl.constants';

const closedSetRoom = (probe: HTMLElement): ChoiceRoom | null => {
  const box = probe.closest<HTMLElement>(OPEN_SET_SELECTOR) ?? probe.closest<HTMLElement>(CLOSED_SET_SELECTOR);
  return box ? { box, width: box.clientWidth } : null;
};

export { closedSetRoom };
