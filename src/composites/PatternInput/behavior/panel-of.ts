/* @layer renderer-components @kind util */
import type { PatternSlotControl, PatternSlotSpec } from './parse-pattern.type';
import type { SlotPanel } from './slot-panel.type';

const controlOf = (slot: PatternSlotSpec): PatternSlotControl =>
  slot.control ?? (slot.min !== undefined && slot.max !== undefined ? 'slider' : 'stepper');

const panelOf = (slot: PatternSlotSpec): SlotPanel => {
  switch (slot.type) {
    case 'hour':
    case 'minute':
      return 'time';
    case 'hex':
      return 'color';
    case 'choice':
      return 'list';
    case 'text':
      return 'none';
    case 'decimal':
      return controlOf(slot) === 'slider' ? 'slider' : 'spin';
    case 'number':
      return controlOf(slot);
  }
};

export { panelOf };
