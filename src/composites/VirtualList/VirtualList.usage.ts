/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A very long list of rows of one height, where only the rows in view are drawn, with the arrow keys to move between them.',
  useWhen: [
    'The list has thousands of items, such as a log of events or every file of a folder, and drawing them all would slow the page.',
    'Every row is the same height and the app draws the content of each row.',
    'The user moves through the rows with the keys and the list must scroll to follow.',
  ],
  avoidWhen: [
    { case: 'Records with columns the user sorts, groups or resizes.', use: 'DataTable' },
    { case: 'A short list where every row can be drawn at once.', use: 'ItemList' },
    { case: 'Files with their size, date and open buttons.', use: 'FileList' },
  ],
  rules: [
    'Give it items, getKey and renderItem; getKey returns a stable id, never the position.',
    'Give label a name for the list, since the rows are drawn without a heading of their own.',
    'Size the list from its parent: it fills the height of its box and scrolls inside it.',
    'Pick rowSize compact, normal or roomy; the height comes from a token and is measured once from the first row, so keep every row the same height.',
    'Keep renderItem cheap and free of its own height; the row cuts what does not fit.',
    'Raise overscan for rows that load slowly while the user scrolls fast; the default is 10 rows on each side.',
    'Use onActiveChange to follow the row that holds focus, such as to show its detail beside the list.',
  ],
  a11y: [
    'The list is a list of items, each with its position and the size of the list, so a reader hears 41 of 5000.',
    'One row is in the tab order; the arrow keys, Home, End, Page Up and Page Down move focus and scroll to it.',
    'A row that holds focus stays drawn when it scrolls out of view, so the keys keep working.',
    'Keys act only when the row itself has focus, so a field inside a row keeps its own arrow keys.',
  ],
  tree: {
    path: ['data', 'a long list drawn only where it is in view'],
    rule: 'VirtualList draws only the rows in view, so a list of any length opens at once and scrolls smoothly.',
  },
  example: `import { VirtualList } from '@drizztdourden08/tessera';

interface Entry {
  id: string;
  text: string;
}

const EventLog = ({ entries }: { entries: Entry[] }) => (
  <VirtualList
    label="Events"
    items={entries}
    getKey={(entry) => entry.id}
    renderItem={(entry) => entry.text}
  />
);
`,
  propsHash: '6a848a0abd982464',
} satisfies ComponentUsage;

export { usage };
