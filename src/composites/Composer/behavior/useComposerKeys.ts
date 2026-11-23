/* @layer renderer-components @kind hook */
import type { KeyboardEvent } from 'react';
import type { ComposerKeysInput } from '../Composer.type';
import { composerSubmits } from './composer-submits';

const useComposerKeys = (input: ComposerKeysInput): ((event: KeyboardEvent<HTMLTextAreaElement>) => void) => {
  const { value, disabled, busy, onSubmit } = input;
  return (event) => {
    if (!composerSubmits(event, event.nativeEvent.isComposing)) return;
    event.preventDefault();
    if (!disabled && !busy && value.trim() !== '') onSubmit(value);
  };
};

export { useComposerKeys };
