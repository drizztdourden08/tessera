/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Flex, Icon, IconButton, Text } from '../../../src/primitives';

const IconButtonToolbar = () => {
  const [pinned, setPinned] = useState(true);
  const [muted, setMuted] = useState(false);

  return (
    <Box className="story-column">
      <Flex gap="xs" align="center">
        <Text variant="title">Item tracker</Text>
        <IconButton label="Pin tracker" active={pinned} onClick={() => setPinned((value) => !value)}>
          <Icon name="pin" size={12} />
        </IconButton>
        <IconButton label="Mute audio" active={muted} onClick={() => setMuted((value) => !value)}>
          <Icon name="volume-x" size={12} />
        </IconButton>
        <IconButton label="More actions"><Icon name="ellipsis" size={12} /></IconButton>
        <IconButton label="Close panel"><Icon name="x" size={12} /></IconButton>
      </Flex>
      <Text variant="caption">{`Pinned: ${pinned ? 'yes' : 'no'}. Audio: ${muted ? 'muted' : 'on'}.`}</Text>
    </Box>
  );
};

export { IconButtonToolbar };
