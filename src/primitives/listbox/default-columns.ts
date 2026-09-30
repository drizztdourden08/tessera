/* @layer renderer-components @kind util */
import { isBlank } from './is-blank';
import { isRecord } from './is-record';
import { DESCRIPTION_FIELD } from './listbox.constants';
import type { ListboxColumn } from './listbox.type';

const defaultColumns = <T>(items: readonly T[], labelOf: (item: T) => string): ListboxColumn<T>[] => {
  const label: ListboxColumn<T> = { id: 'label', field: labelOf };
  const described = items.some((item) => isRecord(item) && !isBlank(item[DESCRIPTION_FIELD]));
  if (!described) return [label];
  return [label, { id: DESCRIPTION_FIELD, field: DESCRIPTION_FIELD, tone: 'muted', align: 'end' }];
};

export { defaultColumns };
