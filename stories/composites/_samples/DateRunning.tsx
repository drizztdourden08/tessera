/* @layer stories @kind component */
import { useState } from 'react';
import { DateText, FactsPanel } from '../../../src/composites';
import { RUNNING } from './date-text-samples.constants';

const DateRunning = () => {
  const [start] = useState(() => Date.now());
  const items = RUNNING.map(({ name, seconds, label }) => ({
    label: name,
    value: <DateText value={start - seconds * 1000} format="elapsed" label={label} />,
  }));
  return <FactsPanel layout="boxed" label="Jobs" groups={[items]} />;
};

export { DateRunning };
