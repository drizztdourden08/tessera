/* @layer stories @kind component */
import { useState } from 'react';
import { Box, JsonInput, Text } from '../../../src/primitives';
import type { JsonInputDemoProps } from './JsonInputDemo.type';

const JsonInputDemo = ({ start, ...rest }: JsonInputDemoProps) => {
  const [value, setValue] = useState<unknown>(start);
  return (
    <Box className="json-input-story">
      <JsonInput aria-label="Plando texts" {...rest} value={value} onChange={setValue} />
      <Text variant="caption" tone="dim" className="json-input-story__value">{`Saved value: ${JSON.stringify(value)}`}</Text>
    </Box>
  );
};

export { JsonInputDemo };
