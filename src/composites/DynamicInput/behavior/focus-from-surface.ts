/* @layer renderer-components @kind util */
import { asNode } from './as-node';
import { elementOf } from './element-of';
import { SLOT_CONTROLS } from './pattern-focus.constants';
import { pressChoice } from './press-choice';
import { slotIndexOf } from './slot-index-of';
import type { MouseEvent } from 'react';
import type { PatternField } from './pattern-field.type';

const isControl = (field: PatternField, node: Node): boolean =>
  field.popoverRef.current?.contains(node) === true || elementOf(node)?.closest(SLOT_CONTROLS) != null;

const focusFromSurface = (field: PatternField, event: MouseEvent<HTMLElement>): void => {
  const node = asNode(event.target);
  if (field.disabled || node === null || isControl(field, node)) return;
  const own = slotIndexOf(node);
  if (own !== null) {
    pressChoice({ field, index: own, open: field.focus.open }, event);
    return;
  }
  event.preventDefault();
  const empty = field.parsed.slots.findIndex((slot) => field.value[slot.name] == null);
  field.moveTo(Math.max(empty, 0), 'all');
};

export { focusFromSurface };
