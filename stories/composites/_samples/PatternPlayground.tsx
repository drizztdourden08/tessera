/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { DynamicInput, parsePattern } from '../../../src/composites';
import { checkPattern } from '../../../src/composites/DynamicInput/behavior/check-pattern';
import { Box, Callout, Field, Text } from '../../../src/primitives';
import { PATTERN_ICONS, PATTERN_LISTS } from './pattern-data';
import type { PatternActions, PatternSetup, PatternValue } from '../../../src/composites';
import type { ControlSize } from '../../../src/primitives';

type PatternPlaygroundArgs = {
  pattern: string;
  label: string;
  counter: string;
  size: ControlSize;
  disabled: boolean;
  invalid: boolean;
};

const SEED_LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const randomSeed = (): string =>
  Array.from({ length: 8 }, () => SEED_LETTERS[Math.floor(Math.random() * SEED_LETTERS.length)] ?? 'A').join('');

const PatternPlayground = (props: PatternPlaygroundArgs) => {
  const { pattern, label, counter, size, disabled, invalid } = props;
  const [value, setValue] = useState<PatternValue>({ seed: 'TRIFORCE' });
  const actions = useMemo<PatternActions>(() => ({
    reroll: { label: 'Reroll', icon: 'refresh-cw', onPress: (current) => setValue({ ...current, seed: randomSeed() }) },
    send: { label: 'Send', icon: 'send', onPress: (current) => setValue({ ...current, comment: null }) },
  }), []);
  const setup: PatternSetup = { lists: PATTERN_LISTS, icons: PATTERN_ICONS, actions, counter: counter === '' ? undefined : counter };
  const problems = useMemo(() => {
    const parsed = parsePattern(pattern);
    return [...parsed.problems, ...checkPattern(parsed, setup)];
  }, [pattern, counter]);

  return (
    <Box className="story-column pattern-story__playground">
      <Field label={label} size={size} error={invalid ? 'Check this value.' : undefined}>
        <DynamicInput pattern={pattern} value={value} onChange={setValue} disabled={disabled} {...setup} />
      </Field>
      <Text className="pattern-story__value">{JSON.stringify(value)}</Text>
      {problems.length > 0 && (
        <Callout tone="warning">
          {problems.map((problem) => <Text as="p" key={problem} className="pattern-story__doc">{problem}</Text>)}
        </Callout>
      )}
    </Box>
  );
};

export { PatternPlayground };
export type { PatternPlaygroundArgs };
