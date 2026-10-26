/* @layer stories @kind component */
import { useState } from 'react';
import { StatusBar } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { menuNote } from '../../_template/menu-note';
import { pixelEditorItems, STATUS_BAR_ARGS } from './status-bar-sample';

const StatusBarMenus = () => {
  const [note, setNote] = useState('Right click a readout, or Tab to it and press Menu or Shift+F10');
  return (
    <Box className="story-column">
      <StatusBar
        label="Editor status"
        items={pixelEditorItems(STATUS_BAR_ARGS)}
        onItemContextMenu={(id, event) => setNote(menuNote(id, event))}
      />
      <Text className="story-label">{note}</Text>
    </Box>
  );
};

export { StatusBarMenus };
