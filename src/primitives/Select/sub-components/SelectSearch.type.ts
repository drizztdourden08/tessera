/* @layer renderer-components @kind types */
import type { SelectState } from '../behavior/useSelect.type';

interface SelectSearchProps<T> {
  select: SelectState<T>;
}

export type { SelectSearchProps };
