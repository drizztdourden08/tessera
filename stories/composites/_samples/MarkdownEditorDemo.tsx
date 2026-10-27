/* @layer stories @kind component */
import { useState } from 'react';
import { MarkdownEditor } from '../../../src/composites';
import type { MarkdownEditorLayout } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';

interface MarkdownEditorDemoProps {
  initial: string;
  layout?: MarkdownEditorLayout;
  compact?: boolean;
  preview?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  keys?: boolean;
  decide?: boolean;
}

const MarkdownEditorDemo = ({ initial, layout, compact, preview, disabled, rows, maxLength, keys = false, decide = false }: MarkdownEditorDemoProps) => {
  const [value, setValue] = useState(initial);
  const [last, setLast] = useState('Press Mod+Enter to send, or Escape to cancel');
  return (
    <Box className="markdown-editor-story__frame">
      <MarkdownEditor
        label="Note"
        value={value}
        onChange={setValue}
        layout={layout}
        compact={compact}
        preview={preview}
        toolbarEnd={decide ? <Button size="sm" variant="primary" onClick={() => setLast('Decided')}>Decide</Button> : undefined}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        placeholder="Write some Markdown"
        onSubmit={keys ? (text) => setLast(`Sent ${text.length} characters`) : undefined}
        onEscape={keys ? () => setLast('Cancelled') : undefined}
      />
      {(keys || decide) && <Text className="story-label">{last}</Text>}
    </Box>
  );
};

export { MarkdownEditorDemo };
