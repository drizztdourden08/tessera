/* @layer renderer-components @kind types */
import type { ListboxSetup } from '../../listbox/listbox-model.type';
import type { SelectLookProps } from '../Select.type';
import type { ActiveReport } from '../behavior/active-report.type';

interface SelectBodyProps<T, V> {
  setup: ListboxSetup<T, V>;
  look: SelectLookProps;
  onActiveChange?: ActiveReport<V>;
}

export type { SelectBodyProps };
