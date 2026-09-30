/* @layer renderer-components @kind types */
import type { ListboxSetup } from '../../listbox/listbox-model.type';
import type { SelectLookProps } from '../Select.type';

interface SelectBodyProps<T, V> {
  setup: ListboxSetup<T, V>;
  look: SelectLookProps;
}

export type { SelectBodyProps };
