/* @layer renderer-components @kind util */
import { NO_CHOICES } from './choice.constants';
import type { PatternSlotSpec } from './parse-pattern.type';
import type { PatternChoice, PatternLists, PatternValue } from '../DynamicInput.type';

const choiceOptions = (slot: PatternSlotSpec, lists: PatternLists | undefined, value: PatternValue): readonly PatternChoice[] => {
  if (slot.list === undefined) return (slot.choices ?? []).map((choice) => ({ value: choice }));
  const source = lists?.[slot.list];
  if (source === undefined) return NO_CHOICES;
  return typeof source === 'function' ? source(value) : source;
};

export { choiceOptions };
