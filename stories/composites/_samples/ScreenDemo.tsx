/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Button, Text } from '../../../src/primitives';
import './screen-frame.css';

interface ScreenDemoProps {
  hidden: boolean;
  onReopen: () => void;
  note: string;
  tools?: ReactNode;
  narrow?: boolean;
  children: ReactNode;
}

const ScreenDemo = (props: ScreenDemoProps) => {
  const { hidden, onReopen, note, tools, narrow = false, children } = props;
  return (
    <Box className="story-column">
      <Box className="story-row">
        {tools}
        <Button variant="secondary" disabled={!hidden} onClick={onReopen}>Reopen the screen</Button>
        <Text className="story-label">{note}</Text>
      </Box>
      <Box className={`story-frame screens-story__frame${narrow ? ' screens-story__frame--narrow' : ''}`}>{children}</Box>
    </Box>
  );
};

export { ScreenDemo };
