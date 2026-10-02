/* @layer stories @kind component */
import { useCallback, useState } from 'react';
import { Box, Field, FieldControlBoundary, Flex, NumberInput, Text } from '../../../src/primitives';
import type { BoundedRangeProps } from './BoundedRange.type';
import './BoundedRange.css';

const idsIn = (node: HTMLElement): string =>
  [...node.querySelectorAll('input')].map((input) => input.id || '(none)').join(', ');

const BoundedRange = (props: BoundedRangeProps) => {
  const { bounded } = props;
  const [low, setLow] = useState(40);
  const [high, setHigh] = useState(20);
  const [ids, setIds] = useState('');
  const measure = useCallback((node: HTMLElement | null) => {
    if (node) setIds(idsIn(node));
  }, []);
  const inputs = (
    <Flex gap="xs" align="center" wrap>
      <Box className="bounded-range__end"><NumberInput aria-label="From" value={low} onChange={setLow} /></Box>
      <Text>-</Text>
      <Box className="bounded-range__end"><NumberInput aria-label="To" value={high} onChange={setHigh} /></Box>
    </Flex>
  );
  return (
    <Box ref={measure} className="story-column">
      <Field label="Hint cost range" error={low > high ? 'The low end is above the high end.' : undefined}>
        {bounded ? <FieldControlBoundary>{inputs}</FieldControlBoundary> : inputs}
      </Field>
      <Text className="story-label">Input ids: {ids}</Text>
    </Box>
  );
};

export { BoundedRange };
