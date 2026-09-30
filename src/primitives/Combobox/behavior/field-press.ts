/* @layer renderer-components @kind util */
import type { MouseEvent } from 'react';
import { isHTMLElement } from '../../dom/is-html-element';
import type { ComboboxState } from './useCombobox.type';

const fieldPress = <T>(event: MouseEvent, box: ComboboxState<T>, disabled: boolean): void => {
  const { target } = event;
  if (disabled || !isHTMLElement(target) || target.closest('button')) return;
  const onInput = target === box.inputRef.current;
  if (!onInput) {
    event.preventDefault();
    box.inputRef.current?.focus();
  }
  if (box.drop.open && !onInput) box.drop.close();
  else box.drop.show();
};

export { fieldPress };
