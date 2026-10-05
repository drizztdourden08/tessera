/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Field, Text } from '../../../src/primitives';
import { PathInput } from '../../../src/composites';
import { BROWSE_DELAY_MS, PICKED_PATH } from './path-samples.constants';
import type { PathInputDemoProps } from './PathInputDemo.type';

const pick = () => new Promise<string>((resolve) => { setTimeout(() => resolve(PICKED_PATH), BROWSE_DELAY_MS); });

const PathInputDemo = (props: PathInputDemoProps) => {
  const { start, label, hint, browse = true, reveal = true, ...rest } = props;
  const [value, setValue] = useState(start);
  const [asked, setAsked] = useState('');
  const field = (
    <PathInput
      {...rest}
      value={value}
      onChange={rest.readOnly ? undefined : setValue}
      onBrowse={browse ? pick : undefined}
      onReveal={reveal ? (path) => setAsked(path) : undefined}
    />
  );
  return (
    <Box className="path-input-story">
      {label ? <Field label={label} hint={hint}>{field}</Field> : field}
      {asked && <Text variant="caption" tone="dim" className="path-input-story__note">{`The app opens the folder of ${asked}`}</Text>}
    </Box>
  );
};

export { PathInputDemo };
