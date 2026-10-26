/* @layer renderer-components @kind hook */
import type { KeyboardEvent } from 'react';
import { useEscapeStack } from '../../../primitives/escape-stack';
import type { MarkdownEditorKeysInput } from '../MarkdownEditor.type';
import { editorKey } from './editor-key';

const useEditorKeys = (input: MarkdownEditorKeysInput): ((event: KeyboardEvent<HTMLTextAreaElement>) => void) => {
  const { value, onSubmit, onEscape, onShortcut } = input;
  const stack = useEscapeStack();
  return (event) => {
    const top = stack.top();
    const intent = editorKey(event, event.nativeEvent.isComposing, top === 'menu' || top === 'popover');
    if (intent === 'submit' && onSubmit) {
      event.preventDefault();
      onSubmit(value);
    } else if (intent === 'escape' && onEscape) {
      onEscape();
    } else {
      onShortcut(event);
    }
  };
};

export { useEditorKeys };
