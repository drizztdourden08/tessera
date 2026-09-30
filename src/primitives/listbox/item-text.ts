/* @layer renderer-components @kind util */
import { firstText } from './first-text';
import { isRecord } from './is-record';
import { readAccessor } from './read-accessor';
import { valueText } from './value-text';
import type { ItemAccessor } from './listbox.type';

const itemText = <T>(
  item: T,
  accessor: ItemAccessor<T, unknown> | undefined,
  fields: readonly string[],
  fallback: readonly string[],
): string => {
  if (accessor !== undefined) return valueText(readAccessor(item, accessor));
  if (!isRecord(item)) return valueText(item);
  return firstText(item, fields) ?? firstText(item, fallback) ?? '';
};

export { itemText };
