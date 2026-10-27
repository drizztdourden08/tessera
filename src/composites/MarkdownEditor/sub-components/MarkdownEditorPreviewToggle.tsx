/* @layer renderer-components @kind component */
import { Divider } from '../../../primitives/Divider';
import { Flex } from '../../../primitives/Flex';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Tooltip } from '../../../primitives/Tooltip';
import { ICON_SIZE } from '../MarkdownEditor.constants';
import type { MarkdownEditorPreviewToggleProps } from '../MarkdownEditor.type';

const MarkdownEditorPreviewToggle = ({ toggle }: MarkdownEditorPreviewToggleProps) => {
  const { markdownEditor } = useTesseraStrings();
  return (
    <Flex gap="2xs" align="center" className="markdown-editor__toggle">
      <Divider orientation="vertical" />
      <Tooltip content={markdownEditor.preview} placement="bottom">
        <IconButton label={markdownEditor.preview} size="sm" active={toggle.active} disabled={toggle.disabled} onClick={toggle.onToggle}>
          <Icon name={toggle.active ? 'eye-off' : 'eye'} size={ICON_SIZE} />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export { MarkdownEditorPreviewToggle };
