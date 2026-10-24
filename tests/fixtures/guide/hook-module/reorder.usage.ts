/* @layer renderer-components @kind data */
import type { HookUsage } from '../../../../src/guide/usage.type';

const usage = {
  job: 'Drag and keyboard reorder for a list the app owns.',
  useWhen: ['An app builds its own reorderable list and needs the drag handlers.'],
  avoidWhen: [{ case: 'Only focus must follow a change in the list, with no reorder.', use: 'useMoveFocus' }],
  rules: ['Pass REORDER_ITEM_SELECTOR as the selector.'],
  a11y: ['Keys move an item without a pointer.'],
  example: `import { useRef } from 'react';
import { REORDER_ITEM_SELECTOR, useReorderDrag } from '@drizztdourden08/tessera';

const useLayerDrag = (onMove: (from: number, to: number) => void) => {
  const listRef = useRef<HTMLElement>(null);
  return { listRef, drag: useReorderDrag({ listRef, selector: REORDER_ITEM_SELECTOR, onDrop: onMove }) };
};
`,
  propsHash: 'd655b8687fd38d91',
} satisfies HookUsage;

export { usage };
