/* @layer renderer-components @kind logic */
import type { MarkdownEditorSendInput, MarkdownEditorSendProps } from '../MarkdownEditor.type';

const sendProps = (input: MarkdownEditorSendInput): MarkdownEditorSendProps | undefined => {
  const { label, value, disabled, submitDisabled, onSubmit } = input;
  if (!onSubmit || !label) return undefined;
  return { label, value, disabled: disabled || submitDisabled === true, onSubmit };
};

export { sendProps };
