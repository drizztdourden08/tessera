/* @layer stories @kind component */
import { Box, Button, Text } from '../../../src/primitives';

const ToolbarKindsPanel = ({ onDone }: { onDone: () => void }) => (
  <Box className="toolbar-story__panel">
    <Text>Pick a colour here. Escape closes the panel and returns focus to the tool.</Text>
    <Button size="sm" onClick={onDone}>Done</Button>
  </Box>
);

export { ToolbarKindsPanel };
