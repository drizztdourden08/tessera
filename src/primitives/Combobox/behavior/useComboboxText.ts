/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { ComboboxLookProps } from '../Combobox.type';
import type { ComboboxText } from './useCombobox.type';

const useComboboxText = <T>(look: ComboboxLookProps<T>, free: boolean): ComboboxText => {
  const [own, setOwn] = useState<string | null>(null);
  const held = free && look.query !== undefined;
  const text = held ? look.query ?? '' : own;
  const set = (next: string) => {
    if (!held) setOwn(next);
    look.onQueryChange?.(next);
  };
  const revert = () => {
    if (free) return;
    if (own) look.onQueryChange?.('');
    setOwn(null);
  };
  return { text, set, revert };
};

export { useComboboxText };
