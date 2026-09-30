/* @layer renderer-components @kind types */
import type { ListboxSetup } from '../../listbox/listbox-model.type';
import type { SelectState } from '../behavior/useSelect.type';
import type { SelectLookProps } from '../Select.type';

interface SelectTriggerProps<T, V> {
  select: SelectState<T>;
  setup: ListboxSetup<T, V>;
  look: SelectLookProps;
}

export type { SelectTriggerProps };
