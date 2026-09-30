/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FieldOf, ListboxLook, ListboxValueProps } from './listbox.type';

interface SetupSource<T, F extends FieldOf<T>> extends ListboxLook<T>, ListboxValueProps<T, F> {
  min?: number;
  max?: number;
  loading?: boolean;
  emptyText?: ReactNode;
}

export type { SetupSource };
