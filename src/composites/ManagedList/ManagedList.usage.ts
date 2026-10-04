/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The list side of a list and editor screen: a title with its count, New, a filter, groups, rename, delete and the loading, empty and error states.',
  useWhen: [
    'The user keeps a set of named things, such as presets, servers or profiles, and adds, renames, deletes and picks them.',
    'The list loads from disk or the network, so it needs a loading line and an error in place of the rows.',
  ],
  avoidWhen: [
    { case: 'The list sits beside an editor whose edits can be lost when the user picks another item.', use: 'MasterDetail' },
    { case: 'The rows are read only, or each row has its own set of actions.', use: 'ListItemRow' },
    { case: 'The items need columns to sort, group and filter.', use: 'DataTable' },
  ],
  rules: [
    'Pass getId and getName; the name feeds the filter, the rename box and the labels of the row buttons.',
    'Pass create to open a form at the top of the list, such as an InlineCreateForm with more fields, and call its close after a create or a cancel.',
    'Pass onCreate in place of create when the app opens its own flow, such as a dialog or a wizard.',
    'Keep the meta of each row to one short line, such as 7 changes · edited 2 hours ago.',
    'Write empty as what to do next, such as Install a game from Games, then make a preset for it.',
    'Write error as what failed and why, such as Could not read servers.json: unexpected end of input.',
  ],
  a11y: [
    'The list is a section named by its title, and each group is a list named by its heading.',
    'The arrow keys, Home and End move the selection between rows; F2 renames the focused row.',
    'In the rename box, Enter keeps the name and Escape cancels; focus goes back to the row.',
    'New moves focus into the create form; Escape or Cancel closes it and focus goes back to New.',
    'After a create, focus goes to the new row when the app picks it, and back to New when it does not.',
    'Delete asks once with its own Cancel, and the error is an alert.',
  ],
  tree: {
    path: ['data', 'a list the user adds to, renames and deletes from'],
    rule: 'ManagedList draws the count, New, the filter, the groups, rename, delete and every state of such a list the same way in every app.',
  },
  example: `import { ManagedList } from '@drizztdourden08/tessera';

interface Server {
  id: string;
  name: string;
  host: string;
}

const ServerList = ({ servers, selectedId, onSelect, onAdd, onRename, onDelete, loading, error }: {
  servers: Server[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  error?: string;
}) => (
  <ManagedList
    title="Servers"
    items={servers}
    getId={(server) => server.id}
    getName={(server) => server.name}
    render={(server) => ({ meta: server.host })}
    selectedId={selectedId}
    onSelect={onSelect}
    onCreate={onAdd}
    createLabel="Add"
    onRename={onRename}
    onDelete={onDelete}
    loading={loading}
    error={error}
    empty="Add a server to host sessions on."
  />
);
`,
  propsHash: 'e9c333736bcb8175',
} satisfies ComponentUsage;

export { usage };
