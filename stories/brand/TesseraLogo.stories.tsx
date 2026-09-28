/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BRAND_APPS, TesseraLogo } from '../../src/brand';
import type { BrandApp } from '../../src/brand';
import { overviewStory } from '../_template/overview-story';

type TesseraLogoArgs = {
  start: BrandApp | 'none';
};

const ARGS: Partial<TesseraLogoArgs> = { start: 'none' };

const ARG_TYPES: StoryLiteArgTypes<TesseraLogoArgs> = {
  start: { control: 'select', options: ['none', ...BRAND_APPS], description: 'The project picked when the logo first draws' },
};

const meta = {
  title: 'Brand/TesseraLogo',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TesseraLogoArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TesseraLogo key={args.start} defaultSelected={args.start === 'none' ? null : args.start} />,
} satisfies StoryLiteStoryDefinition<TesseraLogoArgs>;

const Interactive = {
  name: 'Interactive',
  render: () => <TesseraLogo />,
} satisfies StoryLiteStoryDefinition<TesseraLogoArgs>;

const Overview = overviewStory({
  component: 'TesseraLogo',
  description: 'The Tessera T, interactive: each coloured tile stands for one project built with Tessera, named beside the T and joined to it by a line. Use it on a home or about page that introduces the family. Pointing at a tile or a name makes the tile glow, and picking one slides the T aside to show what that project is. A grey tile, the empty space or Escape puts the T back in the middle.',
  playground: Playground,
  variants: [Interactive],
});

export default meta;
export { Interactive, Overview, Playground };
