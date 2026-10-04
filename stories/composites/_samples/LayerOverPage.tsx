/* @layer stories @kind component */
import { useId, useState } from 'react';
import { ScreenLayer } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { useWindowSwitch } from './useWindowSwitch';

const LayerOverPage = () => {
  const [open, setOpen] = useState(false);
  const { floating } = useWindowSwitch(true);
  const titleId = useId();
  return (
    <Box className="story-frame screen-layer-story__frame screen-layer-story__page">
      <Box className="screen-layer-story__body">
        <Text>The page under the screen. While the screen is open it is inert: Tab never reaches it.</Text>
        <Box className="story-row">
          <Button variant="secondary">Run a session</Button>
          <Button onClick={() => setOpen(true)}>Open the hub</Button>
        </Box>
      </Box>
      <ScreenLayer labelledBy={titleId} floating={floating} hidden={!open}>
        <Box className="screen-layer-story__body">
          <Text as="h3" variant="title" id={titleId}>Hub</Text>
          <Text>Focus starts on the heading. Close gives it back to Open the hub.</Text>
          <Box className="story-row">
            <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
          </Box>
        </Box>
      </ScreenLayer>
    </Box>
  );
};

export { LayerOverPage };
