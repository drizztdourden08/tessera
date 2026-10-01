/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import type { CaretPlace } from './pattern-field.type';
import type { TypedKeyContext } from './typed-segment.type';

const go = (context: TypedKeyContext, event: KeyboardEvent, index: number, place: CaretPlace): boolean => {
  if (context.field.moveTo(index, place)) event.preventDefault();
  return true;
};

const edgeKey = (context: TypedKeyContext, event: KeyboardEvent<HTMLInputElement>): boolean => {
  const { selectionStart, selectionEnd, value } = event.currentTarget;
  const collapsed = selectionStart === selectionEnd;
  const { index } = context;
  if (event.key === 'Backspace' && value === '') return go(context, event, index - 1, 'end');
  if (event.key === 'ArrowLeft' && collapsed && selectionStart === 0) return go(context, event, index - 1, 'end');
  if (event.key === 'ArrowRight' && collapsed && selectionStart === value.length) return go(context, event, index + 1, 'start');
  return false;
};

export { edgeKey };
