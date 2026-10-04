/* @layer stories @kind component */
import { useState } from 'react';
import { KeyValueEditor } from '../../../src/composites';
import type { KeyValueEntry } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import type { KeyValueEditorDemoProps } from './option-editor-demos.type';
import './option-editor-story.css';

const KeyValueEditorDemo = ({ start, ...rest }: KeyValueEditorDemoProps) => {
  const [value, setValue] = useState<Record<string, KeyValueEntry>>({ ...start });
  return (
    <Box className="option-editor-story">
      <KeyValueEditor aria-label="Start inventory" {...rest} value={value} onChange={setValue} />
      <Text variant="caption" tone="dim" className="option-editor-story__value">{`Saved value: ${JSON.stringify(value)}`}</Text>
    </Box>
  );
};

export { KeyValueEditorDemo };
