/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Grid, Select, Text } from '../../../src/primitives';

const LONG_LABEL = 'A very long option label that cannot fit inside half of this narrow column';
const SHORT_LABEL = 'Short';
const LABELS = [LONG_LABEL, SHORT_LABEL];

const LongLabelInGrid = () => {
  const [left, setLeft] = useState<string | null>(LONG_LABEL);
  const [right, setRight] = useState<string | null>(SHORT_LABEL);
  return (
    <Box className="story-column">
      <Grid columns={2}>
        <Select items={LABELS} value={left} onChange={setLeft} aria-label="Long label" />
        <Select items={LABELS} value={right} onChange={setRight} aria-label="Short label" />
      </Grid>
      <Text className="story-label">Both columns stay equal; the long label ends in an ellipsis.</Text>
    </Box>
  );
};

export { LongLabelInGrid };
