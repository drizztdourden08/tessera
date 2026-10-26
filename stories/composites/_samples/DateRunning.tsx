/* @layer stories @kind component */
import { useState } from 'react';
import { DateText, FactsPanel } from '../../../src/composites';
import { Stack } from '../../../src/primitives';
import type { DateLength } from '../../../src/primitives';
import { RUNNING } from './date-text-samples.constants';

const LENGTHS: readonly { label: string; length: DateLength }[] = [
  { label: 'Jobs', length: 'medium' },
  { label: 'Jobs, short: one unit', length: 'short' },
];

const DateRunning = () => {
  const [start] = useState(() => Date.now());
  return (
    <Stack>
      {LENGTHS.map(({ label: title, length }) => (
        <FactsPanel
          key={length}
          layout="boxed"
          label={title}
          groups={[RUNNING.map(({ name, seconds, label }) => ({
            label: name,
            value: <DateText value={start - seconds * 1000} format="elapsed" length={length} label={label} />,
          }))]}
        />
      ))}
    </Stack>
  );
};

export { DateRunning };
