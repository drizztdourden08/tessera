/* @layer renderer-components @kind util */
import { valueText } from './value-text';
import type { ItemContext, ListboxColumn, ListboxTone } from './listbox.type';

const columnTone = <T>(tone: ListboxColumn<T>['tone'], value: unknown, context: ItemContext<T>): ListboxTone | undefined => {
  if (tone === undefined) return undefined;
  if (typeof tone === 'function') return tone(value, context);
  if (typeof tone === 'string') return tone;
  return tone[valueText(value)];
};

export { columnTone };
