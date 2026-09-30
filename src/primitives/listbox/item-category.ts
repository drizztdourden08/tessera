/* @layer renderer-components @kind util */
import { readAccessor } from './read-accessor';
import { valueText } from './value-text';
import type { ItemAccessor } from './listbox.type';

const itemCategory = <T>(item: T, groupBy?: ItemAccessor<T, string | undefined>): string | undefined => {
  if (groupBy === undefined) return undefined;
  const text = valueText(readAccessor(item, groupBy));
  return text === '' ? undefined : text;
};

export { itemCategory };
