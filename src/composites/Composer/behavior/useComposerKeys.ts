/* @layer renderer-components @kind hook */
import type { KeyboardEvent } from 'react';
import type { ComposerKeysInput } from '../Composer.type';
import { composerSubmits } from './composer-submits';

const useComposerKeys = (input: ComposerKeysInput): ((event: KeyboardEvent<HTMLTextAreaElement>) => void) => {
  const { value, disabled, onSubmit } = input;
  return (event) => {
    if (!composerSubmits(event, event.nativeEvent.isComposing)) return;
    event.preventDefault();
    if (!disabled && value.trim() !== '') onSubmit(value);
  };
};

export { useComposerKeys };
