/* @layer renderer-components @kind data */
import type { HookUsage } from '../../guide/usage.type';

const usage = {
  job: 'Drag a rectangle over an area to pick the items inside it, as in a file manager, with Shift to add, Ctrl or Cmd to toggle and Escape to cancel.',
  useWhen: [
    'An app draws a grid of tiles, files or marks and the user picks many by dragging over them.',
    'The area scrolls and the drag must keep going when the pointer reaches its edge.',
  ],
  avoidWhen: [
    { case: 'The rectangle itself must be drawn.', use: 'MarqueeBox' },
    { case: 'The user picks rows of a table.', use: 'DataTable' },
  ],
  rules: [
    'Pass the containerRef of the box that scrolls, the selected keys and onChange; the app keeps the selection.',
    'Spread bind on that box and draw rect with MarqueeBox inside it; rect is null when nobody drags.',
    'Mark each item with data-marquee-key and pass its selector as itemSelector, or pass getRects with rects in the content space of the box.',
    'A drag that starts on an item does nothing by default; pass canStart to change where a drag may start.',
    'The drag starts after the pointer moves 4 pixels; pass threshold to change it, and enabled false to turn it off.',
    'Shift adds to the selection, Ctrl or Cmd toggles the items inside, and Escape puts the selection back as it was.',
    'Set touch-action none on the box when touch must drag, and pass autoScroll false to stop the scroll near its edges.',
    'The functions rectFromPoints, rectsIntersect, hitKeys, mergeSelection and edgeScrollDelta are the same math without the hook.',
  ],
  a11y: [
    'Dragging is for pointers only; give the items keys or checkboxes for the same choice.',
    'Escape cancels a drag and restores the earlier selection.',
    'The picked items must show their own selected state, since the rectangle is hidden from readers.',
  ],
  example: `import { useRef, useState } from 'react';
import { Box, MarqueeBox, useMarqueeSelect } from '@drizztdourden08/tessera';

const Tiles = ({ ids }: { ids: string[] }) => {
  const areaRef = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState<readonly string[]>([]);
  const marquee = useMarqueeSelect({ containerRef: areaRef, itemSelector: '[data-marquee-key]', selected: picked, onChange: setPicked });
  return (
    <Box ref={areaRef} {...marquee.bind}>
      {ids.map((id) => (
        <Box key={id} data-marquee-key={id} aria-selected={picked.includes(id)}>{id}</Box>
      ))}
      <MarqueeBox rect={marquee.rect} />
    </Box>
  );
};
`,
  propsHash: 'df6d06d50332d67b',
} satisfies HookUsage;

export { usage };
