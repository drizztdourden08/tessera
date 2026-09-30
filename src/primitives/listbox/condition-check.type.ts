/* @layer renderer-components @kind types */
import type { ColumnCondition, ItemContext } from './listbox.type';

type ConditionCheck = (condition: ColumnCondition<unknown>, subject: unknown, context: ItemContext<unknown>) => boolean;

export type { ConditionCheck };
