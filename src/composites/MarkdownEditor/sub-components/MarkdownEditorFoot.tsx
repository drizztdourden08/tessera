/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import type { MarkdownEditorFootProps } from '../MarkdownEditor.type';
import { MarkdownEditorCounter } from './MarkdownEditorCounter';
import { MarkdownEditorSend } from './MarkdownEditorSend';

const MarkdownEditorFoot = ({ value, maxLength, count, actions, send }: MarkdownEditorFootProps) => {
  const counter = maxLength === undefined ? null : <MarkdownEditorCounter value={value} max={maxLength} count={count} />;
  if (actions == null && !send) return counter;
  return (
    <Flex className="markdown-editor__foot" gap="xs" align="center">
      {counter}
      <Flex className="markdown-editor__actions" gap="xs" align="center">
        {actions}
        {send && <MarkdownEditorSend {...send} />}
      </Flex>
    </Flex>
  );
};

export { MarkdownEditorFoot };
