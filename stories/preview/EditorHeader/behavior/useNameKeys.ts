/* @layer stories @kind hook */
import { useRef } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';

const useNameKeys = (value: string, onChange: (name: string) => void) => {
  const atFocus = useRef(value);
  const onFocus = (event: FocusEvent<HTMLInputElement>): void => {
    atFocus.current = event.currentTarget.value;
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Escape' && value !== atFocus.current) {
      event.preventDefault();
      event.stopPropagation();
      onChange(atFocus.current);
    }
    if (event.key === 'Enter') event.currentTarget.blur();
  };
  return { onFocus, onKeyDown };
};

export { useNameKeys };
