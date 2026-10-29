/* @layer stories @kind component */
import { Toolbar } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { groupItems } from './toolbar-group-items.constants';

const ToolbarGroupsDemo = () => (
  <Box className="toolbar-story">
    {[false, true].map((grouped) => (
      <Box key={String(grouped)} className="toolbar-story">
        <Text className="story-label">{grouped ? 'Priority on each separator: a group folds whole.' : 'No group priority: a group can split.'}</Text>
        <Box className="toolbar-story__box" data-orientation="horizontal" data-extent="320">
          <Toolbar label={grouped ? 'Grouped tools' : 'Ungrouped tools'} items={groupItems(grouped)} handle={false} />
        </Box>
      </Box>
    ))}
  </Box>
);

export { ToolbarGroupsDemo };
