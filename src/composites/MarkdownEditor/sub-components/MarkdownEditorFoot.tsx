/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Flex } from '../../../primitives/Flex';
import type { MarkdownEditorFootProps } from '../MarkdownEditor.type';
import { MarkdownEditorCounter } from './MarkdownEditorCounter';
import { MarkdownEditorSend } from './MarkdownEditorSend';

const MarkdownEditorFoot = ({ value, maxLength, count, actions, send, floating = false }: MarkdownEditorFootProps) => {
  const counter = maxLength === undefined ? null : <MarkdownEditorCounter value={value} max={maxLength} count={count} />;
  const button = send ? <MarkdownEditorSend {...send} /> : null;
  const floated = floating && button ? <Box className="composer-box__send composer-box__send--label">{button}</Box> : null;
  const inline = floating ? null : button;
  if (actions == null && !inline) return <>{counter}{floated}</>;
  return (
    <>
      <Flex className="markdown-editor__foot" gap="xs" align="center">
        {counter}
        <Flex className="markdown-editor__actions" gap="xs" align="center">
          {actions}
          {inline}
        </Flex>
      </Flex>
      {floated}
    </>
  );
};

export { MarkdownEditorFoot };
