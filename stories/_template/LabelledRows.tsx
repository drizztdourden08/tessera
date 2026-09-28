/* @layer stories @kind component */
import { Box, Text } from '../../src/primitives';
import type { ReactNode } from 'react';

interface LabelledRowsProps<T extends string> {
  items: readonly T[];
  render: (item: T) => ReactNode;
  children?: ReactNode;
}

const LabelledRows = <T extends string>(props: LabelledRowsProps<T>) => {
  const { items, render, children } = props;
  return (
    <Box className="story-column">
      {items.map((item) => (
        <Box key={item} className="story-row">
          <Text className="story-label">{item}</Text>
          {render(item)}
        </Box>
      ))}
      {children}
    </Box>
  );
};

export { LabelledRows };
