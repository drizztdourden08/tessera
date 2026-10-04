/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Field, PathField, Text } from '../../../src/primitives';
import { BROWSE_DELAY_MS, PICKED_PATH } from './path-samples.constants';
import type { PathFieldDemoProps } from './PathFieldDemo.type';

const pick = () => new Promise<string>((resolve) => { setTimeout(() => resolve(PICKED_PATH), BROWSE_DELAY_MS); });

const PathFieldDemo = (props: PathFieldDemoProps) => {
  const { start, label, hint, browse = true, reveal = true, ...rest } = props;
  const [value, setValue] = useState(start);
  const [asked, setAsked] = useState('');
  const field = (
    <PathField
      {...rest}
      value={value}
      onChange={rest.readOnly ? undefined : setValue}
      onBrowse={browse ? pick : undefined}
      onReveal={reveal ? (path) => setAsked(path) : undefined}
    />
  );
  return (
    <Box className="path-field-story">
      {label ? <Field label={label} hint={hint}>{field}</Field> : field}
      {asked && <Text variant="caption" tone="dim" className="path-field-story__note">{`The app opens the folder of ${asked}`}</Text>}
    </Box>
  );
};

export { PathFieldDemo };
