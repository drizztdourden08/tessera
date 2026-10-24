/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Text } from '../../../src/primitives';
import { AnchorPicker } from '../../../src/composites';
import type { Anchor, AnchorPickerProps } from '../../../src/composites';
import './AnchorPickerDemo.css';

type AnchorPickerDemoProps = Partial<Omit<AnchorPickerProps, 'value' | 'onChange'>> & { initial?: Anchor; frame?: boolean };

const AnchorPickerDemo = (props: AnchorPickerDemoProps) => {
  const { initial = 'center', frame = false, ...rest } = props;
  const [value, setValue] = useState<Anchor>(initial);
  return (
    <Box className="story-row anchor-demo">
      <AnchorPicker {...rest} value={value} onChange={setValue} />
      {frame && (
        <Box className="anchor-demo__frame" data-anchor={value}>
          <Box className="anchor-demo__image" />
        </Box>
      )}
      <Text className="story-label">Anchor: {value}</Text>
    </Box>
  );
};

export { AnchorPickerDemo };
