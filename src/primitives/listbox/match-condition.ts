/* @layer renderer-components @kind util */
import { CONDITION_CHECKS } from './match-condition.constants';
import { readField } from './read-field';
import type { ColumnRule, ItemContext } from './listbox.type';

const matchCondition = <T>(when: ColumnRule<T>['when'], value: unknown, context: ItemContext<T>): boolean => {
  if (typeof when === 'function') return when(value, context);
  const subject = when.field === undefined ? value : readField(context.item, when.field);
  return CONDITION_CHECKS.every((check) => check(when, subject, context));
};

export { matchCondition };
