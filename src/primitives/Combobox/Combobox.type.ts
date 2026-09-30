/* @layer renderer-components @kind types */
import type { FieldOf, ListboxFieldProps, ListboxLook, ListboxValueProps } from '../listbox/listbox.type';

interface ComboboxLookProps extends ListboxFieldProps {
  onQueryChange?: (query: string) => void;
  highlight?: boolean;
}

interface ComboboxProps<T = string, F extends FieldOf<T> = never>
  extends ListboxLook<T>, ListboxValueProps<T, F>, ComboboxLookProps {
  filter?: ((item: T, query: string) => boolean) | false;
}

export type { ComboboxLookProps, ComboboxProps };
