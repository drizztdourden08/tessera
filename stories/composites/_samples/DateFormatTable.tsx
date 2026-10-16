/* @layer stories @kind component */
import { useState } from 'react';
import { DateText } from '../../../src/composites';
import { TesseraProvider } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';
import { FORMAT_COLUMNS, FORMAT_ROWS, FRENCH, MINUTE_MS } from './date-text-samples.constants';

const THREE_HOURS = 180;

const DateFormatTable = () => {
  const [at] = useState(() => Date.now() - THREE_HOURS * MINUTE_MS);
  const formatOf = (key: string) => FORMAT_ROWS.find((row) => row.key === key)?.format ?? 'datetime';
  return (
    <Demonstrator
      corner="format"
      rows={FORMAT_ROWS.map(({ key, label }) => ({ key, label }))}
      columns={FORMAT_COLUMNS}
      align="start"
      cell={(row, column) => (column === 'french'
        ? <TesseraProvider overrides={FRENCH}><DateText value={at} format={formatOf(row)} /></TesseraProvider>
        : <DateText value={at} format={formatOf(row)} length={column} />)}
    />
  );
};

export { DateFormatTable };
