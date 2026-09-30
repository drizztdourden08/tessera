/* @layer renderer-components @kind util */
import { columnContent } from './column-content';
import { columnTone } from './column-tone';
import { columnValue } from './column-value';
import { isBlank } from './is-blank';
import { matchCondition } from './match-condition';
import { valueText } from './value-text';
import type { ItemContext, ListboxColumn } from './listbox.type';
import type { ListboxCell } from './listbox-model.type';

const columnCell = <T>(column: ListboxColumn<T>, context: ItemContext<T>): ListboxCell => {
  const value = columnValue(column, context.item);
  const rule = column.rules?.find((candidate) => matchCondition(candidate.when, value, context));
  const content = columnContent(column, rule, value, context);
  const shown = typeof content === 'string' || typeof content === 'number';
  return {
    content: isBlank(content) ? column.empty ?? null : content,
    text: shown ? String(content) : valueText(value),
    tone: rule?.tone ?? columnTone(column.tone, value, context),
  };
};

export { columnCell };
