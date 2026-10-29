/* @layer stories @kind component */
import { SplitPane } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';

const SummarySplit = () => (
  <Box className="story-frame split-pane-story__frame">
    <SplitPane
      orientation="vertical"
      defaultRatio={0.7}
      defaultCollapsed="end"
      startLabel="tiles"
      endLabel="selection"
      start={<Box className="split-pane-story__pane"><Text className="story-label">Tileset</Text></Box>}
      end={<Box className="split-pane-story__pane"><Text className="story-label">Selection details</Text></Box>}
      header={<Text className="story-label">Selection</Text>}
      summary="12 tiles selected, 3 by 4, from forest.png"
    />
  </Box>
);

export { SummarySplit };
