/* @layer stories @kind component */
import { DataTable, DateText, FactsPanel } from '../../../src/composites';
import { Stack } from '../../../src/primitives';
import { DATE_ROWS, DATE_SCHEMA, LOADED, MINUTE_MS } from './date-text-samples.constants';
import type { DateRow } from './date-text-samples.type';

const rowId = (row: DateRow): string => row.id;

const DateInData = () => (
  <Stack gap="md" align="stretch">
    <FactsPanel
      layout="boxed"
      label="Run"
      groups={[[
        { label: 'Last played', value: <DateText value={LOADED - 95 * MINUTE_MS} format="relative" /> },
        { label: 'Started', value: <DateText value="2026-03-14T18:05:00Z" format="date" length="long" /> },
        { label: 'Next race', value: <DateText value={LOADED + 2900 * MINUTE_MS} format="calendar" /> },
      ]]}
    />
    <DataTable rows={DATE_ROWS} schema={DATE_SCHEMA} getRowId={rowId} />
  </Stack>
);

export { DateInData };
