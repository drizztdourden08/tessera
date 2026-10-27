/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Pressable, Text } from '../../../src/primitives';
import { isMenuKey } from '../../../src/primitives/dom/is-menu-key';
import { menuNote } from '../../_template/menu-note';

const PressableMenu = () => {
  const [note, setNote] = useState('Right click it, or Tab to it and press Menu or Shift+F10');
  return (
    <Box className="story-row">
      <Pressable
        className="pressable-demo__row"
        onContextMenu={(event) => setNote(menuNote('the save', event))}
        onKeyDown={(event) => {
          if (!isMenuKey(event)) return;
          event.preventDefault();
          setNote(menuNote('the save', event));
        }}
      >
        Load the Saturday save
      </Pressable>
      <Text className="story-label">{note}</Text>
    </Box>
  );
};

export { PressableMenu };
