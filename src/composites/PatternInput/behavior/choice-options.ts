/* @layer renderer-components @kind util */
import { NO_CHOICES } from './choice.constants';
import type { PatternSlotSpec } from './parse-pattern.type';
import type { PatternChoice, PatternLists } from '../PatternInput.type';

const choiceOptions = (slot: PatternSlotSpec, lists: PatternLists | undefined): readonly PatternChoice[] => {
  if (slot.list !== undefined) return lists?.[slot.list] ?? NO_CHOICES;
  return (slot.choices ?? []).map((value) => ({ value }));
};

export { choiceOptions };
