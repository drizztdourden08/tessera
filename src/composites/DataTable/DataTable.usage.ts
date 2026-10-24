/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Records as rows and columns the user sorts, groups and picks from, such as the players of a session, with the columns taken from a schema.',
  useWhen: [
    'The user browses many records and sorts, groups, reorders or resizes the columns.',
    'A group can hold hundreds of rows, such as every peer the app has seen, and the table must stay fast.',
  ],
  avoidWhen: [
    { case: 'A short list the user edits in place, one input per column.', use: 'RowGrid' },
    { case: 'A few rich rows with their own actions and no columns to sort.', use: 'ListItemRow' },
    { case: 'Files with their size, date and open buttons.', use: 'FileList' },
  ],
  rules: [
    'Give it rows, a schema and getRowId; the columns come from the schema, and viewKey keeps the layout between visits.',
    'Pass fallbackGroupBy to open grouped, and defaultExpanded, a list of group keys or a function of the key and its field, to choose the groups that start open; leave it out to open them all.',
    'Keep the rows in the app and pass them whole; from virtualizeFrom rows, 200 by default, the table draws only the rows in view.',
    'Set virtualizeFrom lower for rows that are costly to draw, or to Infinity to draw every row.',
    'Pass selectable with selectedIds and onSelectionChange to pick many rows; the app keeps the selection.',
  ],
  a11y: [
    'The table is a grid of rows and cells; a selectable table is multiselectable and each row carries aria-selected.',
    'Ctrl and Shift click extend the selection and Escape clears it, from the grid or from a checkbox.',
    'A group header is a button that says whether the group is expanded.',
    'A checkbox in a row that scrolls out of view stays drawn while it has focus, so the keys keep working.',
  ],
  tree: {
    path: ['data', 'rows and columns to sort and filter'],
    rule: 'DataTable gives every collection the same columns, menus and grouping, and draws only the rows in view when the collection is long.',
  },
  example: `import { DataTable } from '@drizztdourden08/tessera';
import type { FieldDescriptor } from '@drizztdourden08/tessera';

interface Peer {
  id: string;
  name: string;
  state: string;
}

const openGroups = ['Connected'];

interface PeerTableProps {
  peers: Peer[];
  schema: FieldDescriptor[];
}

const PeerTable = ({ peers, schema }: PeerTableProps) => (
  <DataTable
    rows={peers}
    schema={schema}
    getRowId={(peer) => peer.id}
    fallbackGroupBy={['state']}
    defaultExpanded={openGroups}
    countLabel={['peer', 'peers']}
  />
);
`,
  propsHash: 'b530ba3e884ee0cf',
} satisfies ComponentUsage;

export { usage };
