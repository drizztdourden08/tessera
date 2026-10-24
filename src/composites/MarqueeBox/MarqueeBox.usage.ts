/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The rectangle that shows an area being dragged over items to pick them, drawn inside the box that scrolls.',
  useWhen: [
    'The user drags over a grid of tiles, files or marks to pick the ones inside, as in a file manager.',
    'The rectangle comes from useMarqueeSelect and must follow the pointer while the box scrolls.',
  ],
  avoidWhen: [
    { case: 'The user picks rows of a table with checkboxes or clicks.', use: 'DataTable' },
    { case: 'The user moves an item or resizes a window by dragging.', use: 'ResizeHandle' },
  ],
  rules: [
    'Pass the rect of useMarqueeSelect; it is null when nobody drags, and then nothing is drawn.',
    'Place it inside the box that scrolls, and give that box position relative, so the rectangle moves with the content.',
    'Spread bind of the hook on that same box, and mark each item with data-marquee-key.',
    'It takes no pointer events, so the items below keep their hover and focus.',
  ],
  a11y: [
    'The rectangle is decoration and hidden from readers; the picked items must show their own selected state.',
    'Dragging is not the only way to pick: give the items keys or checkboxes for the same choice.',
  ],
  tree: {
    path: ['data', 'a rectangle dragged over items to pick them'],
    rule: 'MarqueeBox draws the rectangle of a drag to pick, with the border and fill of the theme.',
  },
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
  propsHash: 'c6ee83f7a265d43f',
} satisfies ComponentUsage;

export { usage };
