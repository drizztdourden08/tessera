/* @layer renderer-components @kind util */
import { isDisabled } from '../field-control/is-disabled';
import { isRecord } from './is-record';
import { DISABLED_FIELD } from './listbox.constants';
import { readAccessor } from './read-accessor';
import type { ItemAccessor } from './listbox.type';

const itemDisabled = <T>(item: T, isItemDisabled?: ItemAccessor<T, boolean>): boolean => {
  if (isItemDisabled !== undefined) return readAccessor(item, isItemDisabled) === true;
  if (!isRecord(item)) return false;
  const disabled = item[DISABLED_FIELD];
  return (typeof disabled === 'boolean' || typeof disabled === 'string') && isDisabled(disabled);
};

export { itemDisabled };
