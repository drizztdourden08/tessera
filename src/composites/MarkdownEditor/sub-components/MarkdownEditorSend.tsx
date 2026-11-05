/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Tooltip } from '../../../primitives/Tooltip';
import { chordLabel } from '../behavior/chord-label';
import type { MarkdownEditorSendProps } from '../MarkdownEditor.type';

const MarkdownEditorSend = ({ label, value, disabled, onSubmit }: MarkdownEditorSendProps) => (
  <Tooltip content={chordLabel('Enter')} placement="top">
    <Button variant="primary" disabled={disabled} onClick={() => onSubmit(value)}>{label}</Button>
  </Tooltip>
);

export { MarkdownEditorSend };
