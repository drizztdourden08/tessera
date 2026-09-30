/* @layer renderer-components @kind util */
import type { ComboboxClassInput } from './combobox-class.type';

const comboboxClass = (input: ComboboxClassInput): string => {
  const { open, disabled, size, multi, className } = input;
  return [
    'combobox',
    'listbox-anchor',
    open && 'combobox--open',
    disabled && 'combobox--disabled',
    size === 'sm' && 'combobox--sm',
    multi && 'combobox--multi',
    className,
  ].filter(Boolean).join(' ');
};

export { comboboxClass };
