/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { MarqueeTiles } from './_samples/MarqueeTiles';
import './MarqueeBox.stories.css';

type MarqueeBoxArgs = {
  count: number;
  enabled: boolean;
  autoScroll: boolean;
};

const ARGS: Partial<MarqueeBoxArgs> = { count: 60, enabled: true, autoScroll: true };

const ARG_TYPES: PlaygroundArgTypes<MarqueeBoxArgs> = {
  count: { group: 'Content', control: 'range', min: 4, max: 200, step: 4, description: 'How many tiles the area holds; more tiles make it scroll.' },
  enabled: { group: 'Behaviour', control: 'boolean', description: 'Turns the drag off when false.' },
  autoScroll: { group: 'Behaviour', control: 'boolean', description: 'Scrolls the area when the pointer nears its edge during a drag.' },
};

const meta = {
  title: 'Composites · Data views/MarqueeBox',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MarqueeBoxArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <MarqueeTiles count={args.count} enabled={args.enabled} autoScroll={args.autoScroll} />,
} satisfies PlaygroundStory<MarqueeBoxArgs>;

const Tiles = {
  name: 'A grid of tiles: drag over the gaps, Shift adds, Ctrl or Cmd toggles, Escape cancels',
  render: () => <MarqueeTiles count={60} />,
} satisfies StoryLiteStoryDefinition<MarqueeBoxArgs>;

const Few = {
  name: 'A few tiles, no scroll',
  render: () => <MarqueeTiles count={12} />,
} satisfies StoryLiteStoryDefinition<MarqueeBoxArgs>;

const CODE = `import { useRef, useState } from 'react';
import { Box, MarqueeBox, useMarqueeSelect } from '@drizztdourden08/tessera';

const areaRef = useRef<HTMLElement>(null);
const [picked, setPicked] = useState<readonly string[]>([]);
const marquee = useMarqueeSelect({ containerRef: areaRef, itemSelector: '[data-marquee-key]', selected: picked, onChange: setPicked });

<Box ref={areaRef} {...marquee.bind}>
  {ids.map((id) => <Box key={id} data-marquee-key={id}>{id}</Box>)}
  <MarqueeBox rect={marquee.rect} />
</Box>`;

const Overview = overviewStory({
  component: 'MarqueeBox',
  description: 'The rectangle of a drag over an area, drawn inside the box that scrolls, to pick the items it covers.',
  points: [
    '`rect` comes from `useMarqueeSelect`; it is null when nobody drags, and nothing is drawn.',
    'Place it inside the scrolling box, so the rectangle moves with the content.',
    'The hook starts after a small move; Shift adds, Ctrl or Cmd toggles and Escape cancels.',
    'Near an edge of the box the drag scrolls it, and the picked items follow.',
    'It takes no pointer events, so the items keep their hover and focus.',
  ],
  instead: '[DataTable] to pick rows of a table with clicks.',
  playground: Playground,
  variants: [Tiles, Few],
  states: {
    render: (props: StateProps) => <MarqueeTiles count={8} {...props} />,
    list: [
      { name: 'Idle', props: {} },
      { name: 'Off', props: { enabled: false } },
    ],
  },
  code: CODE,
});

export default meta;
export { Few, Overview, Playground, Tiles };
