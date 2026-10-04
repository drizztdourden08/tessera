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
  description: 'The Tessera T, interactive: each coloured tile stands for one project built with Tessera, named beside the T and joined to it by a line. Use it on a home or about page that introduces the family. Pointing at a tile or a name makes the tile glow, and picking one slides the T aside to show what that project is. A grey tile, the empty space or Escape puts the T back in the middle.',
  playground: Playground,
  variants: [Interactive],
});

export default meta;
export { Interactive, Overview, Playground };
