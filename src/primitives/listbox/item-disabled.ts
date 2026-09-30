/* @layer renderer-components @kind util */
import { isRecord } from './is-record';
import { DISABLED_FIELD } from './listbox.constants';
import { readAccessor } from './read-accessor';
import type { ItemAccessor } from './listbox.type';

const itemDisabled = <T>(item: T, isItemDisabled?: ItemAccessor<T, boolean>): boolean => {
  if (isItemDisabled !== undefined) return readAccessor(item, isItemDisabled) === true;
  return isRecord(item) && item[DISABLED_FIELD] === true;
};

export { itemDisabled };
