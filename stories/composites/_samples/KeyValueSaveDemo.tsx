/* @layer stories @kind component */
import { useState } from 'react';
import { KeyValueEditor } from '../../../src/composites';
import type { KeyValueEntry } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { ITEMS } from '../../primitives/_samples/option-samples.constants';
import './option-editor-story.css';

const START: Readonly<Record<string, KeyValueEntry>> = { 'Moon Pearl': 1, 'Lamp oil': 2 };

const KeyValueSaveDemo = () => {
  const [value, setValue] = useState<Record<string, KeyValueEntry>>({ ...START });
  const [problem, setProblem] = useState<string | null>(null);
  return (
    <Box className="option-editor-story">
      <KeyValueEditor aria-label="Start inventory" value={value} onChange={setValue} onProblem={setProblem} keys={ITEMS} min={0} max={99} />
      <Box className="option-editor-story__save">
        <Button size="sm" disabled={problem !== null}>Save preset</Button>
        <Text variant="caption" tone="dim">{problem === null ? 'Ready to save.' : `Save waits: ${problem}`}</Text>
      </Box>
    </Box>
  );
};

export { KeyValueSaveDemo };
