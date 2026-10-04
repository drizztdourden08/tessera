/* @layer stories @kind component */
import { useState } from 'react';
import { Box, NamedRange } from '../../../src/primitives';
import type { NamedRangeDemoProps } from './option-demos.type';
import { BALANCING } from './option-samples.constants';

const NamedRangeDemo = ({ start, ...rest }: NamedRangeDemoProps) => {
  const [value, setValue] = useState(start);
  return (
    <Box className="option-story">
      <NamedRange aria-label="Progression balancing" names={BALANCING} min={0} max={99} {...rest} value={value} onChange={setValue} />
    </Box>
  );
};

export { NamedRangeDemo };
