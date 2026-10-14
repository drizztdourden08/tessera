/* @layer renderer-components @kind util */
import { disabledReason } from '../field-control/disabled-reason';
import { isRecord } from './is-record';
import { DISABLED_FIELD } from './listbox.constants';

const itemReason = (item: unknown): string | undefined => {
  if (!isRecord(item)) return undefined;
  const disabled = item[DISABLED_FIELD];
  return typeof disabled === 'string' ? disabledReason(disabled) : undefined;
};

export { itemReason };
