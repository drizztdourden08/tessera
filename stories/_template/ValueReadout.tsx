/* @layer stories @kind component */
import { Box, Text } from '../../src/primitives';
import type { ReactNode } from 'react';

interface ValueReadoutProps {
  value: number | string | readonly string[];
  children: ReactNode;
}

const listText = (values: readonly string[]): string => (values.length === 0 ? 'none' : values.join(', '));

const ValueReadout = (props: ValueReadoutProps) => {
  const { value, children } = props;
  return (
    <Box className="story-column">
      {children}
      <Text className="story-label">Value: {typeof value === 'object' ? listText(value) : value}</Text>
    </Box>
  );
};

export { ValueReadout };
