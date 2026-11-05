/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { FileInput } from '../../../primitives/FileInput';
import { Flex } from '../../../primitives/Flex';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Toolbar } from '../../Toolbar';
import { toolbarItems } from '../behavior/toolbar-items';
import { IMAGE_ACCEPT } from '../MarkdownEditor.constants';
import type { MarkdownEditorToolbarProps } from '../MarkdownEditor.type';

const MarkdownEditorToolbar = (props: MarkdownEditorToolbarProps) => {
  const { disabled, onAction, toggle, end, onImages } = props;
  const { markdownEditor } = useTesseraStrings();
  const pick = useRef<HTMLInputElement>(null);
  const items = toolbarItems(markdownEditor, { disabled, onAction, toggle, onPickImages: onImages ? () => pick.current?.click() : undefined });
  return (
    <Flex className="markdown-editor__toolbar" gap="xs" align="center">
      <Toolbar items={items} label={markdownEditor.toolbar} />
      {end != null && <Flex className="markdown-editor__toolbar-end" gap="xs" align="center">{end}</Flex>}
      {onImages && <FileInput ref={pick} accept={IMAGE_ACCEPT} multiple disabled={disabled} onFiles={onImages} />}
    </Flex>
  );
};

export { MarkdownEditorToolbar };
