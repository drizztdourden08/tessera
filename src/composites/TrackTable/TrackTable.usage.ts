/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A flat, read-only table whose columns share the width in fractions and drop out, least needed first, as the table narrows.',
  useWhen: [
    'A few rows with a few cells each, such as the agents of a node, sit on a page or inside a card with no frame of their own.',
    'The table lives in a pane or a drawer whose width changes, and the least needed columns may leave when it is narrow.',
  ],
  avoidWhen: [
    { case: 'The user sorts, groups, resizes or selects among many records.', use: 'DataTable' },
    { case: 'The user edits the rows in place.', use: 'RowGrid' },
    { case: 'Each row is a label and a value, with no columns to compare.', use: 'StatRow' },
  ],
  rules: [
    'Give each column a fr, its share of the width; leave it out for 1.',
    'Pass width on a column for a fixed size instead of a share: a size or space token name such as size-96, or a CSS length such as 6rem; it wins over fr.',
    'Mark a column drop 1, 2 or 3 to hide it below 768, 640 or 480 px of table width; 1 leaves first.',
    'Pass hideBelow on a column to pick the width yourself: 1280, 1120, 896, 768, 640 or 480 px of table width; it wins over drop, and the column leaves its grid track too, so no gap is left.',
    'Never mark the column that names the row: it stays at every width.',
    'Draw state with Status and groups with Tag inside cell; the table sets no look for them.',
    'Put the table in a Card when it needs a frame; it draws no border or background.',
    'Pass empty for the message shown when there are no rows.',
    'Pass onRowClick to make each row a target: it takes focus with a ring, and a click or Enter calls it with the row; a click on a control inside a cell does not.',
    'Pass rowDetail to draw a full width row right under its row; return nothing for a row with no detail, and own the open state in the app.',
    'Pass rowTone to tint a row with a state: active, pending, error, warning, muted or fresh, the same names as rowState of DataTable.',
  ],
  a11y: [
    'The table is named by label, and each cell is read in its row; a dropped column is removed from the reading order too.',
    'A row with onRowClick is reached by Tab and used with Enter; tell the state in a cell too, since a tone is colour only.',
    'Give a column whose label would be a symbol a text label, since the header is the only name of its cells.',
  ],
  tree: {
    path: ['data', 'a flat table of rows that drops columns as it narrows'],
    rule: 'TrackTable shares the width by fractions and drops the least needed columns by the width of the table, not the window.',
  },
  example: `import { Status, TrackTable } from '@drizztdourden08/tessera';
import type { TrackColumn } from '@drizztdourden08/tessera';

interface Agent {
  id: string;
  name: string;
  online: boolean;
  seen: string;
}

const COLUMNS: TrackColumn<Agent>[] = [
  { id: 'name', label: 'Agent', fr: 2, cell: (agent) => agent.name },
  { id: 'state', label: 'State', cell: (agent) => <Status tone={agent.online ? 'success' : 'danger'} dot halo>{agent.online ? 'Online' : 'Offline'}</Status> },
  { id: 'seen', label: 'Last seen', drop: 1, cell: (agent) => agent.seen },
];

const Agents = ({ agents }: { agents: Agent[] }) => (
  <TrackTable label="Agents" rows={agents} columns={COLUMNS} rowKey={(agent) => agent.id} />
);
`,
  propsHash: 'e37ef4ee4cd198f1',
} satisfies ComponentUsage;

export { usage };
