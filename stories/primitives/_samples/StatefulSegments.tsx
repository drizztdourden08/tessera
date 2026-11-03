/* @layer stories @kind component */
import { useState } from 'react';
import { Box, SegmentedControl, Text } from '../../../src/primitives';
import type { StatefulSegmentsProps } from './StatefulSegments.type';

const StatefulSegments = <T extends string>(props: StatefulSegmentsProps<T>) => {
  const { initial, options, label, description, disabled, deselectable, size, tooltipPlacement, selectedTone, mixed: startMixed } = props;
  const [value, setValue] = useState<T | ''>(initial);
  const [mixed, setMixed] = useState(startMixed);
  return (
    <Box className="story-column">
      <SegmentedControl<T | ''>
        value={value}
        options={options}
        mixed={mixed}
        onChange={(next) => {
          setMixed(undefined);
          setValue(next);
        }}
        onDeselect={deselectable ? () => setValue('') : undefined}
        label={label}
        description={description}
        disabled={disabled}
        size={size}
        selectedTone={selectedTone}
        tooltipPlacement={tooltipPlacement}
      />
      <Text className="story-label">Value: {value === '' ? '(unset)' : value}</Text>
    </Box>
  );
};

export { StatefulSegments };
