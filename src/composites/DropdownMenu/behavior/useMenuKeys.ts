/* @layer renderer-components @kind hook */
import type { KeyboardEvent } from 'react';
import { typeaheadIndex } from '../../../primitives/listbox/typeahead-index';
import { useTypeaheadText } from '../../../primitives/listbox/useTypeaheadText';
import { isTypingKey } from './is-typing-key';
import { MENU_LABEL_SELECTOR } from './menu-items-of.constants';
import { menuItemsOf } from './menu-items-of';
import { stepTarget } from './step-target';
import type { UseMenuKeysParams } from './useMenuKeys.type';

const labelOf = (item: HTMLElement): string => item.querySelector(MENU_LABEL_SELECTOR)?.textContent ?? '';

const leaveKey = (event: KeyboardEvent<HTMLElement>, current: number, params: UseMenuKeysParams): (() => void) | undefined => {
  if (event.key === 'ArrowLeft') return params.onBack;
  if (event.key === 'Escape') return params.onBack ?? params.onExit;
  if (event.key === 'ArrowUp' && current === 0) return params.onTop;
  return undefined;
};

const useMenuKeys = (params: UseMenuKeysParams) => {
  const typed = useTypeaheadText();

  const moveFocus = (event: KeyboardEvent<HTMLElement>, items: HTMLButtonElement[], current: number): boolean => {
    const stepped = items.length > 0 ? stepTarget(event.key, current, items.length) : -1;
    const text = stepped === -1 ? typed(event.key, event.timeStamp) : null;
    const target = text === null ? stepped : typeaheadIndex(items.map(labelOf), items.map(() => true), current, text);
    items[target]?.focus();
    return target !== -1;
  };

  return (event: KeyboardEvent<HTMLElement>): void => {
    const menu = params.menuRef.current;
    if (!menu) return;
    if (event.key === 'Tab') {
      params.onExit?.();
      return;
    }
    if (params.onType && isTypingKey(event)) {
      params.onType();
      return;
    }
    const items = menuItemsOf(menu);
    const current = items.findIndex((item) => item === event.target);
    const leave = leaveKey(event, current, params);
    if (leave) leave();
    else if (!moveFocus(event, items, current)) return;
    event.preventDefault();
    event.stopPropagation();
  };
};

export { useMenuKeys };
