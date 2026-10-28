/* @layer renderer-components @kind data */

const usage = {
  job: 'Drag and keyboard reorder for a list the app owns.',
  useWhen: ['An app builds its own reorderable list and needs the drag handlers.'],
  avoidWhen: [{ case: 'Only focus must follow a change in the list, with no reorder.', use: 'useMoveFocus' }],
  rules: ['Pass REORDER_ITEM_SELECTOR as the selector.'],
  a11y: ['Keys move an item without a pointer.'],
  tree: {
    path: ['data', 'a headline number that does one thing'],
    rule: 'A hook module sits in no part of the tree.',
  },
  example: `import { useRef } from 'react';
import { REORDER_ITEM_SELECTOR, useReorderDrag } from '@drizztdourden08/tessera';

const useLayerDrag = (onMove: (from: number, to: number) => void) => {
  const listRef = useRef<HTMLElement>(null);
  return { listRef, drag: useReorderDrag({ listRef, selector: REORDER_ITEM_SELECTOR, onDrop: onMove }) };
};
`,
  propsHash: '4efd9bedb16cbfb7',
};

export { usage };
