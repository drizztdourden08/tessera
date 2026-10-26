/* @layer stories @kind component */
import { useState } from 'react';
import { ListItemRow } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { isMenuKey } from '../../../src/primitives/dom/is-menu-key';
import { menuNote } from '../../_template/menu-note';

const ListItemRowMenu = () => {
  const [note, setNote] = useState('Right click the row, or Tab to it and press Menu or Shift+F10');
  return (
    <Box className="story-column">
      <ListItemRow
        name="Friday async"
        meta="8 players, eu-west-2"
        onClick={() => undefined}
        onContextMenu={(event) => setNote(menuNote('Friday async', event))}
        onKeyDown={(event) => {
          if (!isMenuKey(event)) return;
          event.preventDefault();
          setNote(menuNote('Friday async', event));
        }}
      />
      <Text className="story-label">{note}</Text>
    </Box>
  );
};

export { ListItemRowMenu };
