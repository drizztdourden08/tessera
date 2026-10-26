/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Markdown } from '../../Markdown';
import type { MarkdownEditorPreviewProps } from '../MarkdownEditor.type';

const MarkdownEditorPreview = (props: MarkdownEditorPreviewProps) => {
  const { value, onLink, images, linkIds, hidden } = props;
  const { markdownEditor } = useTesseraStrings();
  return (
    <Box className="markdown-editor__preview" role="region" aria-label={markdownEditor.preview} hidden={hidden}>
      {value.trim() === ''
        ? <Text variant="caption" tone="dim">{markdownEditor.nothingToPreview}</Text>
        : <Markdown source={value} size="sm" headingOffset={1} onLink={onLink} images={images} linkIds={linkIds} />}
    </Box>
  );
};

export { MarkdownEditorPreview };
