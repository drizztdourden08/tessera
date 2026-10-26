/* @layer stories @kind component */
import { useState } from 'react';
import { MarkdownEditor } from '../../../src/composites';
import type { MarkdownEditorLayout } from '../../../src/composites';
import { Box } from '../../../src/primitives';

interface MarkdownEditorDemoProps {
  initial: string;
  layout?: MarkdownEditorLayout;
  disabled?: boolean;
  rows?: number;
}

const MarkdownEditorDemo = ({ initial, layout, disabled, rows }: MarkdownEditorDemoProps) => {
  const [value, setValue] = useState(initial);
  return (
    <Box className="markdown-editor-story__frame">
      <MarkdownEditor label="Note" value={value} onChange={setValue} layout={layout} disabled={disabled} rows={rows} placeholder="Write some Markdown" />
    </Box>
  );
};

export { MarkdownEditorDemo };
