/* @layer stories @kind component */
import { useState } from 'react';
import { DateText } from '../../../src/composites';
import { TesseraProvider } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';
import { FRENCH, LADDER, LADDER_COLUMNS, MINUTE_MS } from './date-text-samples.constants';

const DateLadder = () => {
  const [start] = useState(() => Date.now());
  const at = (key: string) => start + (LADDER.find((step) => step.key === key)?.minutes ?? 0) * MINUTE_MS;
  return (
    <Demonstrator
      corner="value"
      rows={LADDER.map(({ key, label }) => ({ key, label }))}
      columns={LADDER_COLUMNS}
      align="start"
      cell={(row, column) => {
        if (column === 'french') return <TesseraProvider overrides={FRENCH}><DateText value={at(row)} format="relative" /></TesseraProvider>;
        if (column === 'calendar') return <DateText value={at(row)} format="calendar" />;
        return <DateText value={at(row)} format="relative" length={column === 'short' ? 'short' : undefined} />;
      }}
    />
  );
};

export { DateLadder };
