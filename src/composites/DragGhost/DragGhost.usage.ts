/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The picture that follows the pointer while items are dragged: a stack of up to three thumbnails and the count of items.',
  useWhen: [
    'The user drags one or many items of a grid, a table or a tree and needs to see how many go with the pointer.',
    'The items have thumbnails, such as sprites or images, that tell what is being moved.',
  ],
  avoidWhen: [
    { case: 'The user drags a rectangle over items to pick them.', use: 'MarqueeBox' },
    { case: 'The user drags tiles in a long grid that already draws its own ghost.', use: 'VirtualGrid' },
  ],
  rules: [
    'Pass count, the number of items dragged, and thumbnails, a list of nodes; at most three are stacked, newest on top, and never more than count.',
    'Pass point, the pointer in client pixels, to follow the pointer in a layer above the page; the point of useReorderDrag fits.',
    'Pass point null while nobody drags and nothing is drawn; leave point out to draw the ghost in place, such as in a story.',
    'It takes no pointer events, so the drop target below keeps its hover.',
    'Keep each thumbnail small and free of its own size; the card cuts what does not fit.',
  ],
  a11y: [
    'The ghost is decoration and hidden from readers; announce the move in a live region when it ends.',
    'Dragging is not the only way to move: give the items a key move for the same result.',
  ],
  buildingBlock: true,
  example: `import { DragGhost, useReorderDrag } from '@drizztdourden08/tessera';
import { useRef } from 'react';

const Pile = ({ names }: { names: string[] }) => {
  const listRef = useRef<HTMLElement>(null);
  const drag = useReorderDrag({
    listRef,
    selector: '[data-reorder-index]',
    keys: () => names,
    onDrop: () => undefined,
  });
  return <DragGhost count={drag.dragKeys.length} thumbnails={names} point={drag.point} />;
};
`,
  propsHash: '7a9158ac4b2de254',
} satisfies ComponentUsage;

export { usage };
