/* @layer renderer-components @kind util */
import { separatorChars } from './separator-chars';
import type { KeyboardEvent } from 'react';
import type { TypedKeyContext } from './typed-segment.type';

const isPlainChar = (event: KeyboardEvent): boolean =>
  event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

const separatorKey = (context: TypedKeyContext, event: KeyboardEvent<HTMLInputElement>): boolean => {
  const { field, slot, kind, index, draftRef, typedRef } = context;
  if (!isPlainChar(event) || kind.clean(event.key, slot) !== '') return false;
  event.preventDefault();
  const typedSome = typedRef.current && (draftRef.current ?? '') !== '';
  if (typedSome && separatorChars(field.parsed.parts, index).has(event.key)) field.moveTo(index + 1, 'all');
  return true;
};

export { separatorKey };
