/* @layer stories @kind component */
import { useState } from 'react';
import type { MouseEvent } from 'react';
import { Box, Icon, Pressable, Text } from '../../../src/primitives';

const PressableClicks = () => {
  const [presses, setPresses] = useState<string[]>([]);
  const press = (event: MouseEvent<HTMLButtonElement>) => {
    const by = event.detail === 0 ? 'keyboard' : 'pointer';
    setPresses((previous) => [...previous.slice(-2), by]);
  };
  return (
    <Box className="story-row">
      <Pressable className="pressable-demo__tile" onClick={press}>
        <Icon name="compass" size={24} />
        <Text>Recentre the map</Text>
      </Pressable>
      <Text className="story-label">
        {presses.length === 0 ? 'Click it, or Tab to it and press Enter or Space' : `Last presses: ${presses.join(', ')}`}
      </Text>
    </Box>
  );
};

export { PressableClicks };
