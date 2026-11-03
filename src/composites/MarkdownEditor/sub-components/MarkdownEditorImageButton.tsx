/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Divider } from '../../../primitives/Divider';
import { FileInput } from '../../../primitives/FileInput';
import { Flex } from '../../../primitives/Flex';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Tooltip } from '../../../primitives/Tooltip';
import { ICON_SIZE, IMAGE_ACCEPT } from '../MarkdownEditor.constants';
import type { MarkdownEditorImageButtonProps } from '../MarkdownEditor.type';

const MarkdownEditorImageButton = ({ disabled, onFiles }: MarkdownEditorImageButtonProps) => {
  const { markdownEditor } = useTesseraStrings();
  const pick = useRef<HTMLInputElement>(null);
  return (
    <Flex gap="2xs" align="center">
      <Divider orientation="vertical" />
      <Tooltip content={markdownEditor.image} placement="bottom">
        <IconButton label={markdownEditor.image} size="sm" disabled={disabled} onClick={() => pick.current?.click()}>
          <Icon name="image" size={ICON_SIZE} />
        </IconButton>
      </Tooltip>
      <FileInput ref={pick} accept={IMAGE_ACCEPT} multiple disabled={disabled} onFiles={onFiles} />
    </Flex>
  );
};

export { MarkdownEditorImageButton };
