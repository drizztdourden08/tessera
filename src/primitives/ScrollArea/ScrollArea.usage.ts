/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A box that scrolls its content, with a styled scrollbar, such as a changelog, a list of cards or a pane body.',
  useWhen: [
    'Content can grow past a fixed height or width, such as a changelog or a grid of cards.',
    'Two boxes must scroll together, through scrollTo and onScroll.',
  ],
  avoidWhen: [
    { case: 'The content always fits and nothing needs to scroll.', use: 'Box' },
    { case: 'The list is long enough that every row must not be drawn at once.', use: 'VirtualGrid' },
  ],
  rules: [
    'axis picks y, x or both; the other direction is clipped. It defaults to y.',
    'scrollbar slim draws a thin line along the edge. It rests in a quiet grey and widens and turns the primary colour under the pointer and while dragged; native keeps the browser bar.',
    'thumb auto, on a slim area, hides the line at rest and shows it under the pointer, while it scrolls and a moment after, and while focus is inside. It defaults to always.',
    'A slim area reserves its own gutter on the inline end, so opaque children such as cards never cover the line.',
    'Set fade to false when the edges of the content must not melt away.',
    'gutter stable keeps room for a native scrollbar even when nothing overflows. Set it on a page body whose content reflows with width, such as a Grid with fit or minColWidth or a responsive RowGrid, so the scrollbar cannot come and go and flip the layout. It defaults to auto, which takes no room until the content overflows.',
    'Give the box a height, through a class or its parent, or it grows with its content and never scrolls.',
  ],
  a11y: [
    'The box is a plain div and keeps the reading order of its children.',
    'Pass tabIndex 0 and a label when the content has nothing focusable, so a keyboard can scroll it.',
  ],
  tree: {
    path: ['layout', 'content that scrolls'],
    rule: 'ScrollArea scrolls content that can outgrow its box and keeps the slim scrollbar clear of the content.',
  },
  example: `import type { ReactNode } from 'react';
import { Grid, ScrollArea } from '@drizztdourden08/tessera';

const Library = ({ cards }: { cards: ReactNode[] }) => (
  <ScrollArea scrollbar="slim" className="library">
    <Grid minColWidth={224} gap="sm">
      {cards}
    </Grid>
  </ScrollArea>
);
`,
  propsHash: '5a425e0b9e3bf718',
} satisfies ComponentUsage;

export { usage };
