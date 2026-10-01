/* @layer renderer-components @kind util */
import { asNode } from './as-node';
import { elementOf } from './element-of';
import { slotIndexOf } from './slot-index-of';
import type { MouseEvent } from 'react';
import type { PatternField } from './pattern-field.type';

const isOwnSpot = (field: PatternField, node: Node): boolean =>
  slotIndexOf(node) !== null || field.popoverRef.current?.contains(node) === true || elementOf(node)?.closest('button') != null;

const focusFromSurface = (field: PatternField, event: MouseEvent<HTMLElement>): void => {
  const node = asNode(event.target);
  if (field.disabled || node === null || isOwnSpot(field, node)) return;
  event.preventDefault();
  const empty = field.parsed.slots.findIndex((slot) => field.value[slot.name] == null);
  field.moveTo(Math.max(empty, 0), 'all');
};

export { focusFromSurface };
