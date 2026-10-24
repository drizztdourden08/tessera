/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Button, Text } from '../../../src/primitives';
import { FloatingPrompt } from '../../../src/composites';
import type { FloatingPromptScope } from '../../../src/composites';
import './PromptWorkArea.css';

interface PromptWorkAreaProps {
  scope?: FloatingPromptScope;
  startOpen?: boolean;
}

const PromptWorkArea = (props: PromptWorkAreaProps) => {
  const { scope = 'container', startOpen = true } = props;
  const [open, setOpen] = useState(startOpen);
  const [note, setNote] = useState('Waiting for an answer.');
  const answer = (text: string) => () => {
    setNote(text);
    setOpen(false);
  };
  const actions = [
    { id: 'apply', label: 'Apply', onSelect: answer('Applied: 3 edits are on the canvas.') },
    { id: 'cancel', label: 'Cancel', onSelect: answer('Cancelled: the canvas is as it was.'), cancel: true },
  ];

  return (
    <Box className="story-column">
      <Box className="story-row">
        <Button variant="secondary" onClick={() => setOpen(true)}>Ask again</Button>
        <Text className="story-label" role="status">{note}</Text>
      </Box>
      <Box className="story-frame prompt-story__area">
        <Box className="prompt-story__tools">
          <Button size="sm" variant="secondary" onClick={() => setNote('Brush chosen.')}>Brush</Button>
          <Button size="sm" variant="secondary" onClick={() => setNote('Eraser chosen.')}>Eraser</Button>
        </Box>
        <Box className="prompt-story__canvas" />
        <FloatingPrompt open={open} scope={scope} message="Apply the 3 pending edits to the canvas." actions={actions} />
      </Box>
    </Box>
  );
};

export { PromptWorkArea };
