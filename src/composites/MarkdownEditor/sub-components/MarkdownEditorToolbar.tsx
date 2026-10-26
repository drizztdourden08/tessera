/* @layer renderer-components @kind component */
import { Divider } from '../../../primitives/Divider';
import { Flex } from '../../../primitives/Flex';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { MARKDOWN_EDITOR_ACTIONS, MARKDOWN_EDITOR_GROUPS } from '../MarkdownEditor.constants';
import type { MarkdownEditorToolbarProps } from '../MarkdownEditor.type';
import { MarkdownEditorActionButton } from './MarkdownEditorActionButton';

const MarkdownEditorToolbar = (props: MarkdownEditorToolbarProps) => {
  const { disabled, onAction } = props;
  const { markdownEditor } = useTesseraStrings();
  return (
    <Flex className="markdown-editor__toolbar" role="toolbar" aria-label={markdownEditor.toolbar} gap="xs" align="center" wrap>
      {MARKDOWN_EDITOR_GROUPS.map((group, index) => (
        <Flex key={group.join('-')} gap="2xs" align="center">
          {index > 0 && <Divider orientation="vertical" />}
          {MARKDOWN_EDITOR_ACTIONS.filter((spec) => group.includes(spec.id)).map((spec) => (
            <MarkdownEditorActionButton key={spec.id} spec={spec} disabled={disabled} onAction={onAction} />
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export { MarkdownEditorToolbar };
