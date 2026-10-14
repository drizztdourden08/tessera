/* @layer stories @kind component */
import { useState } from 'react';
import { Flex, Text } from '../../../../src/primitives';
import { Rating } from '../Rating';
import type { RatingSize } from '../Rating.type';

const RatingPick = ({ size = 'lg', disabled = false }: { size?: RatingSize; disabled?: boolean }) => {
  const [value, setValue] = useState<number | null>(null);
  return (
    <Flex align="center" gap="md">
      <Rating value={value} size={size} disabled={disabled} onChange={setValue} />
      <Text as="span" variant="caption">{value === null ? 'No pick yet' : `Picked ${value}`}</Text>
    </Flex>
  );
};

export { RatingPick };
