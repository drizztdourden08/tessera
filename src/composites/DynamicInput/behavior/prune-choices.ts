/* @layer renderer-components @kind logic */
import type { ParsedPattern, PatternSlotSpec } from './parse-pattern.type';
import type { PatternLists, PatternValue } from '../DynamicInput.type';

const isStale = (slot: PatternSlotSpec, lists: PatternLists | undefined, value: PatternValue): boolean => {
  const source = slot.list === undefined ? undefined : lists?.[slot.list];
  const current = value[slot.name];
  if (slot.free === true || typeof source !== 'function' || typeof current !== 'string') return false;
  return !source(value).some((choice) => choice.value === current);
};

const pruneChoices = (parsed: ParsedPattern, lists: PatternLists | undefined, value: PatternValue): PatternValue => {
  const stale = parsed.slots.filter((slot) => isStale(slot, lists, value));
  if (stale.length === 0) return value;
  return { ...value, ...Object.fromEntries(stale.map((slot) => [slot.name, null])) };
};

export { pruneChoices };
