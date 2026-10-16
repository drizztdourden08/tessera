/* @layer stories @kind component */
import { useState } from 'react';
import { Demonstrator } from '../../../_template/Demonstrator';
import { RelativeTime } from '../RelativeTime';
import { FRENCH, LADDER, LADDER_COLUMNS } from './time-ladder.constants';

const MINUTE_MS = 60_000;

const TimeLadder = () => {
  const [start] = useState(() => Date.now());
  const at = (key: string) => start + (LADDER.find((step) => step.key === key)?.minutes ?? 0) * MINUTE_MS;
  return (
    <Demonstrator
      rows={LADDER.map(({ key, label }) => ({ key, label }))}
      columns={LADDER_COLUMNS}
      align="start"
      cell={(row, column) => (
        <RelativeTime value={at(row)} format={column === 'short' ? 'short' : 'long'} strings={column === 'fr' ? FRENCH : undefined} />
      )}
    />
  );
};

export { TimeLadder };
