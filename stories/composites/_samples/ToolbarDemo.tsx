/* @layer stories @kind component */
import { Toolbar } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { TOOL_NAMES } from './toolbar-story.constants';
import type { ToolbarDemoProps } from './toolbar-story.type';
import { useDrawingTools } from './useDrawingTools';

const ToolbarDemo = (props: ToolbarDemoProps) => {
  const { orientation = 'horizontal', handle = true, size = 'sm', extent = '640', captions = false, readout = false } = props;
  const { items, tool, size: brush, shape, last } = useDrawingTools(captions);
  return (
    <Box className="toolbar-story" data-orientation={orientation}>
      <Box className="toolbar-story__box" data-orientation={orientation} data-extent={extent}>
        <Toolbar label="Drawing tools" orientation={orientation} size={size} handle={handle} items={items} />
      </Box>
      {readout && <Text className="story-label">{`${TOOL_NAMES[tool]}, ${String(brush)} px, ${shape}. Last action: ${last}.`}</Text>}
    </Box>
  );
};

export { ToolbarDemo };
