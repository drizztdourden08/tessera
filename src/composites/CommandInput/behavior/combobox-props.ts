/* @layer renderer-components @kind logic */
import type { InputHTMLAttributes } from 'react';
import type { CommandSuggest } from '../CommandInput.type';

const comboboxProps = (suggest: CommandSuggest): InputHTMLAttributes<HTMLInputElement> => {
  if (!suggest.known) return {};
  const { open, active } = suggest;
  return {
    role: 'combobox',
    'aria-autocomplete': 'list',
    'aria-expanded': open,
    'aria-controls': open ? suggest.listId : undefined,
    'aria-activedescendant': open && active >= 0 ? suggest.optionId(active) : undefined,
  };
};

export { comboboxProps };
