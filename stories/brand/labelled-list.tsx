/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Text } from '../../src/primitives';

const labelledList = <T extends string>(items: readonly T[], render: (item: T) => ReactNode) => (
  <Box className="story-list">
    {items.map((item) => (
      <Box key={item} className="story-list__item">
        <Text className="story-label">{item}</Text>
        {render(item)}
      </Box>
    ))}
  </Box>
);

export { labelledList };
