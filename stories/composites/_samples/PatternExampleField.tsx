/* @layer stories @kind component */
import { useState } from 'react';
import { DynamicInput } from '../../../src/composites';
import { Box, Field, Text } from '../../../src/primitives';
import { PATTERN_ICONS, PATTERN_LISTS } from './pattern-data';
import type { PatternActions, PatternValue } from '../../../src/composites';
import type { ControlSize } from '../../../src/primitives';
import type { PatternExample } from './pattern-data';

interface PatternExampleFieldProps {
  example: PatternExample;
  size?: ControlSize;
  readout?: boolean;
}

const readoutOf = (value: PatternValue): string => JSON.stringify(value).replace(/,"/g, ', "');

const actionsFor = (value: PatternValue, setValue: (next: PatternValue) => void, setSent: (text: string) => void): PatternActions => ({
  send: {
    label: 'Send comment',
    icon: 'send',
    disabled: typeof value.comment !== 'string' || value.comment === '',
    onPress: (current) => {
      setSent(String(current.comment ?? ''));
      setValue({ ...current, comment: null });
    },
  },
});

const PatternExampleField = (props: PatternExampleFieldProps) => {
  const { example, size, readout = true } = props;
  const [value, setValue] = useState<PatternValue>(example.initial);
  const [sent, setSent] = useState<string | null>(null);
  const actions = example.actions === undefined ? undefined : actionsFor(value, setValue, setSent);

  return (
    <Box className="pattern-story__card">
      <Field label={example.label} hint={example.hint} size={size}>
        <DynamicInput
          pattern={example.pattern}
          value={value}
          onChange={setValue}
          lists={PATTERN_LISTS}
          icons={PATTERN_ICONS}
          actions={actions}
          slots={example.slots}
          counter={example.counter}
        />
      </Field>
      {readout && <Text className="pattern-story__value">{readoutOf(value)}</Text>}
      {sent !== null && <Text className="story-label">Sent: {sent}</Text>}
    </Box>
  );
};

export { PatternExampleField };
