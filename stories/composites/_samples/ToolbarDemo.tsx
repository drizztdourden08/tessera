/* @layer stories @kind component */
import { Toolbar } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { TOOL_NAMES } from './toolbar-story.constants';
import type { ToolbarDemoProps } from './toolbar-story.type';
import { useContextNote } from './useContextNote';
import { useDrawingTools } from './useDrawingTools';

const ToolbarDemo = (props: ToolbarDemoProps) => {
  const { orientation = 'horizontal', handle = true, size = 'sm', extent = '640', readout = false, layout = 'bar', columns, hiddenItems } = props;
  const { items, tool, size: brush, shape, last } = useDrawingTools(props);
  const { onContextMenu, note } = useContextNote(props.context);
  return (
    <Box className="toolbar-story" data-orientation={orientation}>
      <Box className="toolbar-story__box" data-orientation={orientation} data-extent={extent} data-layout={layout}>
        <Toolbar
          label="Drawing tools"
          orientation={orientation}
          layout={layout}
          size={size}
          handle={handle}
          items={items}
          columns={columns}
          hiddenItems={hiddenItems}
          onContextMenu={onContextMenu}
        />
      </Box>
      {readout && <Text className="story-label">{`${TOOL_NAMES[tool]}, ${String(brush)} px, ${shape}. Last action: ${last}.`}</Text>}
      {note && <Text className="story-label">{note}</Text>}
    </Box>
  );
};

export { ToolbarDemo };
