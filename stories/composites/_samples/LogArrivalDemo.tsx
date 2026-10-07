/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import { LogPanel } from '../../../src/composites';
import type { LogRow } from '../../../src/composites';
import { Box, Button } from '../../../src/primitives';
import { LOG_KINDS, LOG_ROWS } from './data-log';

const TICK_MS = 700;
const BURST = 400;

const START_S = 19 * 3600 + 22 * 60;

const clock = (seconds: number): string =>
  [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map((n) => String(n).padStart(2, '0')).join(':');

const lineAt = (n: number): LogRow => {
  const sample = LOG_ROWS[n];
  if (sample) return { ...sample, id: `arrive-${n}` };
  return { id: `arrive-${n}`, gutter: clock(START_S + n * 3), tag: 'ITEM', kind: 'item', message: `Line ${n + 1}: item sent to slot ${(n % 14) + 1}` };
};

const arriving = (from: number, count: number): LogRow[] => Array.from({ length: count }, (_, i) => lineAt(from + i));

const LogArrivalDemo = () => {
  const [rows, setRows] = useState<readonly LogRow[]>([]);
  const ticking = rows.length < LOG_ROWS.length;
  useEffect(() => {
    if (!ticking) return undefined;
    const timer = setInterval(() => setRows((now) => [...now, ...arriving(now.length, 1)]), TICK_MS);
    return () => clearInterval(timer);
  }, [ticking]);
  const extra = (
    <>
      <Button variant="secondary" size="sm" onClick={() => setRows((now) => [...now, ...arriving(now.length, BURST)])}>Add 400 lines</Button>
      <Button variant="tertiary" size="sm" onClick={() => setRows([])}>Start over</Button>
    </>
  );
  return (
    <Box className="log-panel-story">
      <LogPanel rows={rows} kinds={LOG_KINDS} className="server-log" countLabel="lines" emptyLabel="Waiting for the server." toolbarExtra={extra} />
    </Box>
  );
};

export { LogArrivalDemo };
