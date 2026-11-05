/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import type { MarkdownEditorFootProps } from '../MarkdownEditor.type';
import { MarkdownEditorCounter } from './MarkdownEditorCounter';

const MarkdownEditorFoot = ({ value, maxLength, count, actions }: MarkdownEditorFootProps) => {
  const counter = maxLength === undefined ? null : <MarkdownEditorCounter value={value} max={maxLength} count={count} />;
  if (actions == null) return counter;
  return (
    <Flex className="markdown-editor__foot" gap="xs" align="center">
      {counter}
      <Flex className="markdown-editor__actions" gap="xs" align="center">{actions}</Flex>
    </Flex>
  );
};

export { MarkdownEditorFoot };
