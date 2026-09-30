/* @layer renderer-components @kind hook */
import type { KeyboardEvent } from 'react';
import { navTarget } from '../../listbox/nav-target';
import type { ComboboxKeyParams } from './useCombobox.type';

const onNavKey = <T>(event: KeyboardEvent, params: ComboboxKeyParams<T>): boolean => {
  const target = navTarget(event.key, false);
  if (target === undefined) return false;
  event.preventDefault();
  if (!params.drop.open) params.drop.show();
  else if (!event.altKey) params.model.active.move(target);
  return true;
};

const onActionKey = <T>(event: KeyboardEvent, params: ComboboxKeyParams<T>) => {
  const { key } = event;
  if (key === 'Enter' && params.drop.open) {
    event.preventDefault();
    params.pickActive();
  } else if (key === 'Escape' && !params.drop.open && params.editing) {
    event.preventDefault();
    params.revert();
  } else if (key === 'Tab' && params.drop.open) {
    params.drop.close();
  } else if (key === 'Backspace' && params.emptyInput) {
    params.removeLast();
  }
};

const useComboboxKeys = <T>(params: ComboboxKeyParams<T>) => (event: KeyboardEvent) => {
  if (!onNavKey(event, params)) onActionKey(event, params);
};

export { useComboboxKeys };
