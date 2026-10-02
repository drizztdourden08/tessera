/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Icon } from '../../src/primitives';
import type { BrandIconName, BrandIconTone, IconFlip, IconRotation } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import './icons.stories.css';

type BrandIconArgs = {
  name: BrandIconName;
  tone: BrandIconTone;
  size: number;
  rotate: IconRotation;
  flip: 'none' | IconFlip;
};

const BRANDS: readonly BrandIconName[] = ['tessera', 'rotp', 'rotp-mascot', 'archipelia', 'brock'];
const SIZES = [16, 24, 48] as const;
const TONES = ['colour', 'mono'] as const;

const ARG_TYPES: StoryLiteArgTypes<BrandIconArgs> = {
  name: { control: 'select', options: [...BRANDS] },
  tone: { control: 'select', options: ['color', 'mono'], description: 'color keeps the brand inks; mono draws in currentColor like any icon.' },
  size: { control: 'number' },
  rotate: { control: 'select', options: [0, 90, 180, 270] },
  flip: { control: 'select', options: ['none', 'horizontal', 'vertical', 'both'] },
};

const meta = {
  title: 'Core · Icons/Brand icons',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<BrandIconArgs>;

const Playground = {
  name: 'Playground',
  args: { name: 'archipelia', tone: 'color', size: 48, rotate: 0, flip: 'none' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Icon.Brand name={args.name} tone={args.tone} size={args.size} rotate={args.rotate} flip={args.flip === 'none' ? undefined : args.flip} />
  ),
} satisfies StoryLiteStoryDefinition<BrandIconArgs>;

const EveryBrand = {
  name: 'Every brand',
  render: () => (
    <Demonstrator
      rows={axis(BRANDS)}
      columns={TONES.flatMap((tone) => SIZES.map((size) => ({ key: `${tone} ${size}`, label: `${tone} ${size}` })))}
      cell={(name, column) => {
        const [tone, size] = column.split(' ');
        return <Icon.Brand name={name} size={Number(size)} tone={tone === 'mono' ? 'mono' : undefined} />;
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<BrandIconArgs>;

const Overview = overviewStory({
  component: 'Icon.Brand',
  description: 'Every family mark as an icon: tessera, rotp, the rotp mascot, archipelia and brock. It is the same Icon underneath, so it takes the same size, rotation, flip and label. In colour it keeps the brand inks; with tone="mono" it draws in currentColor and follows the text, like any other icon in a toolbar or a menu.',
  playground: Playground,
  variants: [EveryBrand],
  code: `import { Icon } from '@drizztdourden08/tessera';

<Icon.Brand name="rotp" size={32} />
<Icon.Brand name="archipelia" tone="mono" label="Archipelia" />`,
});

export default meta;
export { EveryBrand, Overview, Playground };
