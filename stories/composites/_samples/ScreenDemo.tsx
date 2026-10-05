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
  phone?: boolean;
  tall?: boolean;
  children: ReactNode;
}

const ScreenDemo = (props: ScreenDemoProps) => {
  const { hidden, onReopen, note, tools, narrow = false, phone = false, tall = false, children } = props;
  const frame = ['story-frame screens-story__frame', narrow && 'screens-story__frame--narrow', phone && 'screens-story__frame--phone', tall && 'screens-story__frame--tall'];
  return (
    <Box className="story-column">
      <Box className="story-row">
        {tools}
        <Button variant="secondary" disabled={!hidden} onClick={onReopen}>Reopen the screen</Button>
        <Text className="story-label">{note}</Text>
      </Box>
      <Box className={frame.filter(Boolean).join(' ')}>{children}</Box>
    </Box>
  );
};

export { ScreenDemo };
