/* @layer renderer-components @kind types */
import type { InputAdornment } from '../field-control/input-adornment.type';
import type { TextInputProps } from '../TextInput/TextInput.type';

interface SearchInputProps extends Omit<TextInputProps, 'type' | 'value' | 'defaultValue' | 'onChange' | 'start' | 'end'> {
  value: string;
  onChange: (value: string) => void;
  start?: InputAdornment;
}

export type { SearchInputProps };
