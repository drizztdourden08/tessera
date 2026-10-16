/* @layer stories @kind component */
import { Box, Text } from '../../../src/primitives';

type DockKitPanelProps = {
  rows: readonly string[];
};

const DockKitPanel = (props: DockKitPanelProps) => (
  <Box className="story-column dock-story__kit">
    {props.rows.map((row) => <Text key={row}>{row}</Text>)}
  </Box>
);

export { DockKitPanel };
