/* @layer stories @kind component */
import { useState } from 'react';
import { DataTable } from '../../../src/composites';
import { buildSchema } from '../../../src/data';
import type { SortEntry } from '../../../src/data';
import { Box, Text } from '../../../src/primitives';

type ProcessRow = { id: string; name: string; memory: number; cpu: number };

const PROCESSES: readonly ProcessRow[] = [
  { id: 'p1', name: 'api-server', memory: 412.6, cpu: 18 },
  { id: 'p2', name: 'worker-a', memory: 96.2, cpu: 64 },
  { id: 'p3', name: 'worker-b', memory: 12.4, cpu: 3 },
  { id: 'p4', name: 'indexer', memory: 1210, cpu: 41 },
  { id: 'p5', name: 'scheduler', memory: 9.5, cpu: 1 },
];

const PROCESS_SCHEMA = buildSchema(PROCESSES, {
  labels: { memory: 'Memory', cpu: 'CPU' },
  units: { memory: 'MB', cpu: '%' },
  hidden: ['id'],
});

const processId = (process: ProcessRow): string => process.id;

const DataTableUnits = () => {
  const [sort, setSort] = useState<readonly SortEntry[]>([{ path: 'memory', dir: 'desc' }]);
  return (
    <Box className="data-table-story data-table-story--units">
      <Text className="story-label">
        Memory and CPU carry a unit. The sort reads the number, so 1210 MB sorts above 412.6 MB and 9.5 MB below 12.4 MB.
      </Text>
      <DataTable
        rows={PROCESSES}
        schema={PROCESS_SCHEMA}
        getRowId={processId}
        sort={sort}
        onSortChange={setSort}
        countLabel={['process', 'processes']}
      />
    </Box>
  );
};

export { DataTableUnits };
