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
    'For a height of your own pass rowHeight, the name of a size token such as size-64; it wins over rowSize, and a raw pixel number is not accepted.',
    'Keep renderItem cheap and free of its own height; the row cuts what does not fit.',
    'Set orientation to horizontal for a strip; itemSize, a size token, is then the width of each item, and the keys are Left and Right; the strip is a box that scrolls sideways, so give the list a height and read it left to right.',
    'Give selection ({ selected, onChange }) to pick items; the list becomes a multi select listbox with roving focus, and a click, Ctrl, Shift, Ctrl and A, Space, Escape and Shift with an arrow work as in a file manager through useSelectionModel.',
    'Give getLabel(item, index) for type ahead: a typed letter moves focus to the next item whose label starts with it.',
    'Give scrollRef, bind and overlay and call getRects on the ref to let useMarqueeSelect pick items of a strip; with a selection every item carries data-marquee-key.',
    'Raise overscan for rows that load slowly while the user scrolls fast; the default is 10 rows on each side.',
    'Use onActiveChange to follow the row that holds focus, such as to show its detail beside the list.',
  ],
  a11y: [
    'The list is a list of items, each with its position and the size of the list, so a reader hears 41 of 5000.',
    'One row is in the tab order; the arrow keys, Home, End, Page Up and Page Down move focus and scroll to it.',
    'A row that holds focus stays drawn when it scrolls out of view, so the keys keep working.',
    'Keys act only when the row itself has focus, so a field inside a row keeps its own arrow keys.',
    'With a selection the list is a listbox of options that say if they are selected, and a horizontal list says so with aria-orientation.',
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
  propsHash: 'd98943be93cbba02',
} satisfies ComponentUsage;

export { usage };
