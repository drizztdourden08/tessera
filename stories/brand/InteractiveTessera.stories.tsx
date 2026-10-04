/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { BRAND_APPS, InteractiveTessera } from '../../src/brand';
import type { BrandApp } from '../../src/brand';
import { overviewStory } from '../_template/overview-story';

type InteractiveTesseraArgs = {
  start: BrandApp | 'none';
};

const ARGS: Partial<InteractiveTesseraArgs> = { start: 'none' };

const ARG_TYPES: PlaygroundArgTypes<InteractiveTesseraArgs> = {
  start: { group: 'Content', control: 'select', options: ['none', ...BRAND_APPS], description: 'The project picked when the logo first draws' },
};

const meta = {
  title: 'Core · Brand/InteractiveTessera',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<InteractiveTesseraArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <InteractiveTessera key={args.start} defaultSelected={args.start === 'none' ? null : args.start} />,
} satisfies PlaygroundStory<InteractiveTesseraArgs>;

const Interactive = {
  name: 'Interactive',
  render: () => <InteractiveTessera />,
} satisfies StoryLiteStoryDefinition<InteractiveTesseraArgs>;

const Overview = overviewStory({
  component: 'InteractiveTessera',
  description: 'The Tessera T as a map of the family, for a home or about page: each coloured tile is one project built with Tessera.',
  points: [
    'Each project is named beside the T and joined to its tile by a line.',
    'Pointing at a tile or a name makes the tile glow.',
    'Picking one slides the T aside to show what that project is.',
    'A grey tile, the empty space or [[Esc]] puts the T back in the middle.',
    '`start` picks a project when the logo first draws.',
  ],
  playground: Playground,
  variants: [Interactive],
});

export default meta;
export { Interactive, Overview, Playground };
