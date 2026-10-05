/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';
import type { InputAdornment } from '../field-control/input-adornment.type';
import type { FieldOf, ListboxFieldProps, ListboxLook, ListboxValueProps } from '../listbox/listbox.type';

interface ComboboxKeyState<T> {
  open: boolean;
  active: T | undefined;
}

type ComboboxKeyHandler<T> = (event: KeyboardEvent<HTMLInputElement>, list: ComboboxKeyState<T>) => void;

interface ComboboxLookProps<T = unknown> extends ListboxFieldProps {
  onQueryChange?: (query: string) => void;
  highlight?: boolean;
  freeText?: boolean;
  query?: string;
  start?: InputAdornment;
  listLabel?: string;
  onKeyDown?: ComboboxKeyHandler<T>;
}

interface ComboboxProps<T = string, F extends FieldOf<T> = never>
  extends ListboxLook<T>, ListboxValueProps<T, F>, ComboboxLookProps<T> {
  filter?: ((item: T, query: string) => boolean) | false;
}

export type { ComboboxKeyHandler, ComboboxKeyState, ComboboxLookProps, ComboboxProps };
