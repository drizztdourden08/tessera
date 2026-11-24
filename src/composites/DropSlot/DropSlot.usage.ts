/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A dashed container that takes one dragged card: it shows a label when empty, holds one node when filled, and clears on a button.',
  useWhen: [
    'The user fills a named place by dragging a card onto it, such as the two ends of a transfer.',
    'The same place can also be filled by a pick, so a keyboard or a click opens a menu instead of a drag.',
  ],
  avoidWhen: [
    { case: 'The user reorders items of a list by dragging.', use: 'DragGhost' },
    { case: 'The user picks one value from a fixed list with no dragging.', use: 'Select' },
  ],
  rules: [
    'Pass label, the name of the slot; it is shown while empty and read by assistive tech as the name of the group.',
    'Pass children, the filled node, or filled to say the slot is full without children; leave both out for the empty state.',
    'onDrop receives the payload of the drag, the string of dataTransfer.getData(accept), and the drop event; the slot does not change itself, the parent keeps the state and passes children.',
    'accept is a data type such as application/x-account; only drags that carry it highlight the slot and drop; leave it out to take text/plain.',
    'The source sets the payload in its onDragStart with event.dataTransfer.setData(type, value); it works with useNativeDragGhost and with plain HTML drag and drop.',
    'onClear shows a clear button on a filled slot; clearLabel names it.',
    'onPick is called on a click and on Enter, empty or filled, so a menu can choose instead of a drag.',
    'disabled stops drops, picks and the clear button.',
    'size is sm, md or lg and sets the square the slot fills.',
  ],
  a11y: [
    'The slot is a focusable group named by label; Enter calls onPick.',
    'Dragging is not the only way to fill it: always give onPick a way to choose.',
    'Announce the new content in a live region when a drop fills the slot.',
  ],
  buildingBlock: true,
  example: `import { DropSlot } from '@drizztdourden08/tessera';
import { useState } from 'react';

const Source = () => {
  const [account, setAccount] = useState<string | undefined>();
  return (
    <DropSlot
      label="From"
      accept="application/x-account"
      onDrop={setAccount}
      onClear={() => setAccount(undefined)}
      onPick={() => undefined}
    >
      {account}
    </DropSlot>
  );
};
`,
  propsHash: '348f1a3b4a5f74bb',
} satisfies ComponentUsage;

export { usage };
