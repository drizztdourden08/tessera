/* @layer stories @kind component */
import { useState } from 'react';
import { Box, SetPicker } from '../../../src/primitives';
import type { SetPickerDemoProps } from './option-demos.type';
import { HINTED, ITEMS } from './option-samples.constants';

const SetPickerDemo = ({ start = HINTED, ...rest }: SetPickerDemoProps) => {
  const [value, setValue] = useState<readonly string[]>(start);
  return (
    <Box className="set-picker-story">
      <SetPicker aria-label="Start hints" options={ITEMS} {...rest} value={value} onChange={setValue} />
    </Box>
  );
};

export { SetPickerDemo };
