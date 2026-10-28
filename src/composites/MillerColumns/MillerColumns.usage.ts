/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Side by side columns for a nested set, such as folders: picking a folder in one column shows its children in the next, and the pick is shared with the app.',
  useWhen: [
    'The user walks down a hierarchy one level at a time and keeps the levels above in view, as in a file browser.',
    'A file browser offers columns beside a grid and a list, and all of them pick the same keys.',
  ],
  avoidWhen: [
    { case: 'The tree is shown as one list that folds open and closed.', use: 'Tree' },
    { case: 'The items are groups of sessions with one picked row.', use: 'GroupTree' },
    { case: 'There is one flat list of items.', use: 'VirtualList' },
  ],
  rules: [
    'Pass items, the first column, with getKey, getChildren and renderItem; getChildren gives the children of a folder, or nothing for a leaf that opens.',
    'Pass selection, the picked keys and onChange; the set is the same for every column, so a grid or a list of the same app can use it too.',
    'A press picks one item in a column and opens its children in the next column; Ctrl and Shift pick several in that column and close the columns after it.',
    'Keep the open items in the app with path and onPathChange, or pass defaultPath and let the columns keep them.',
    'Pass onOpen to hear Enter or a double click on a leaf.',
    'Pass getLabel for type ahead in a column.',
    'Pass columnWidth to size the columns and rowSize for the height of the rows.',
    'Each column is a VirtualList, so a column of thousands of items draws only the rows in view; the columns scroll sideways inside the box, so give it a height.',
  ],
  a11y: [
    'Each column is a list box named with the label and its number, and the row that opens a column stays marked.',
    'Right goes into the open folder and picks its first item, and Left goes back to the folder in the column before.',
    'Up, Down, Home, End and a typed letter move inside a column, and the picked items are marked with aria-selected.',
  ],
  buildingBlock: true,
  example: `import { useState } from 'react';
import { MillerColumns } from '@drizztdourden08/tessera';

type Entry = { id: string; name: string; children?: Entry[] };

const Browser = ({ entries }: { entries: Entry[] }) => {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  return (
    <MillerColumns
      label="Files"
      items={entries}
      getKey={(entry) => entry.id}
      getChildren={(entry) => entry.children}
      renderItem={(entry) => entry.name}
      selection={{ selected: picked, onChange: setPicked }}
    />
  );
};
`,
  propsHash: 'pending',
} satisfies ComponentUsage;

export { usage };
