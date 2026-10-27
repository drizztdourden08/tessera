/* @layer stories @kind component */
import { useState } from 'react';
import { MarkdownEditor } from '../../../src/composites';
import type { MarkdownEditorLayout } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';

interface MarkdownEditorDemoProps {
  initial: string;
  layout?: MarkdownEditorLayout;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  keys?: boolean;
}

const MarkdownEditorDemo = ({ initial, layout, disabled, rows, maxLength, keys = false }: MarkdownEditorDemoProps) => {
  const [value, setValue] = useState(initial);
  const [last, setLast] = useState('Press Mod+Enter to send, or Escape to cancel');
  return (
    <Box className="markdown-editor-story__frame">
      <MarkdownEditor
        label="Note"
        value={value}
        onChange={setValue}
        layout={layout}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        placeholder="Write some Markdown"
        onSubmit={keys ? (text) => setLast(`Sent ${text.length} characters`) : undefined}
        onEscape={keys ? () => setLast('Cancelled') : undefined}
      />
      {keys && <Text className="story-label">{last}</Text>}
    </Box>
  );
};

export { MarkdownEditorDemo };
