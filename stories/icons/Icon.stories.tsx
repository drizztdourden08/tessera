/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import swordsIcon from '@iconify-icons/lucide/swords';
import { Box, Icon, ICONS } from '../../src/primitives';
import type { IconEffectColor, IconEffectKind, IconEffectSize, IconFlip, IconName, IconRotation } from '../../src/primitives';
import { APP_ICONS } from '../../src/primitives/icon-sets/app.constants';
import { STATUS_ICONS } from '../../src/primitives/icon-sets/status.constants';
import { INTERFACE_ICONS } from '../../src/primitives/icon-sets/interface.constants';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { IconEffectSpecimen } from './IconEffectSpecimen';
import { IconEffectsGallery } from './IconEffectsGallery';
import { IconGallery } from './IconGallery';
import { IconOwnPaths } from './IconOwnPaths';
import './icons.stories.css';

type IconTone = 'text' | 'primary' | 'secondary' | 'warning' | 'danger' | 'muted';
type FlipChoice = 'none' | IconFlip;
type EffectChoice = 'none' | IconEffectKind;

type IconArgs = {
  name: IconName;
  size: number;
  rotate: IconRotation;
  flip: FlipChoice;
  tone: IconTone;
  label: string;
  effect: EffectChoice;
  every: number;
  color: IconEffectColor;
  count: number;
  popSize: IconEffectSize;
  showSamples: boolean;
};

const NAMES = Object.keys(ICONS) as IconName[];
const SIZES = [12, 16, 24, 32, 48] as const;
const ROTATIONS: readonly IconRotation[] = [0, 90, 180, 270];
const FLIPS: readonly IconFlip[] = ['horizontal', 'vertical', 'both'];
const namesOf = (group: object): IconName[] => Object.keys(group) as IconName[];

const ARG_TYPES: PlaygroundArgTypes<IconArgs> = {
  name: { group: 'Content', control: 'select', options: NAMES, optionView: (name) => <Icon name={name} size={16} />, description: 'A name from the named set.' },
  label: { group: 'Content', control: 'text', description: 'Accessible name. Leave empty for a decorative icon, which is hidden from assistive tech.' },
  size: { group: 'Appearance', control: 'number', description: 'Width and height in pixels, or any CSS length.' },
  rotate: { group: 'Appearance', control: 'select', options: [0, 90, 180, 270] },
  flip: { group: 'Appearance', control: 'select', options: ['none', 'horizontal', 'vertical', 'both'] },
  tone: { group: 'Appearance', control: 'select', options: ['text', 'primary', 'secondary', 'warning', 'danger', 'muted'], description: 'Icons draw in currentColor.' },
  effect: { group: 'Motion', control: 'select', options: ['none', 'twinkle', 'glint', 'ping', 'burst', 'dot', 'comet', 'shimmer'], description: 'A pop that lands on a random drawn point of the icon.' },
  every: { group: 'Motion', control: 'number', description: 'Milliseconds between pops.' },
  color: { group: 'Motion', control: 'select', options: ['current', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'info'], description: 'Colour of the pop.' },
  count: { group: 'Motion', control: 'number', description: 'Pops at each beat, each on its own point.' },
  popSize: { group: 'Motion', control: 'select', options: ['sm', 'md', 'lg'], description: 'The effect size option: how big each pop draws. The line weight stays the same.' },
  showSamples: { group: 'Motion', control: 'boolean', description: 'Dots every sampled point, so you can see that pops land only on drawn parts.' },
};

const meta = {
  title: 'Core · Icons/Icon',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<IconArgs>;

const Playground = {
  name: 'Playground',
  args: {
    name: 'gamepad-2', size: 32, rotate: 0, flip: 'none', tone: 'primary', label: '',
    effect: 'twinkle', every: 1600, color: 'primary', count: 1, popSize: 'md', showSamples: false,
  },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className={args.tone === 'text' ? undefined : `icon-demo--${args.tone}`}>
      {args.effect === 'none' ? (
        <Icon
          name={args.name}
          size={args.size}
          rotate={args.rotate}
          flip={args.flip === 'none' ? undefined : args.flip}
          label={args.label || undefined}
        />
      ) : (
        <IconEffectSpecimen
          name={args.name}
          size={args.size}
          effect={{ kind: args.effect, every: args.every, color: args.color, count: args.count, size: args.popSize }}
          showSamples={args.showSamples}
        />
      )}
    </Box>
  ),
} satisfies PlaygroundStory<IconArgs>;

const NamedSet = {
  name: 'Named set',
  render: () => (
    <Box className="story-column">
      <IconGallery title="App" names={namesOf(APP_ICONS)} />
      <IconGallery title="Interface" names={namesOf(INTERFACE_ICONS)} />
      <IconGallery title="Status and media" names={namesOf(STATUS_ICONS)} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<IconArgs>;

const Transforms = {
  name: 'Size, rotation and flip',
  render: () => (
    <Box className="story-column">
      <Demonstrator
        columns={SIZES.map((size) => ({ key: String(size), label: `${size}px` }))}
        cell={(_row, size) => <Icon name="compass" size={Number(size)} />}
      />
      <Demonstrator
        columns={ROTATIONS.map((rotate) => ({ key: String(rotate), label: `rotate ${rotate}` }))}
        cell={(_row, rotate) => <Icon name="arrow-right" size={24} rotate={Number(rotate) as IconRotation} />}
      />
      <Demonstrator
        columns={FLIPS.map((flip) => ({ key: flip, label: `flip ${flip}` }))}
        cell={(_row, flip) => <Icon name="log-in" size={24} flip={flip} />}
      />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<IconArgs>;

const Effects = {
  name: 'Effects',
  render: () => <IconEffectsGallery />,
} satisfies StoryLiteStoryDefinition<IconArgs>;

const AnyIcon = {
  name: 'Any @iconify icon',
  render: () => (
    <Demonstrator rows={[{ key: 'swords', label: 'icon={swordsIcon}' }]} cell={() => <Icon icon={swordsIcon} size={32} label="Swords" />} />
  ),
} satisfies StoryLiteStoryDefinition<IconArgs>;

const OwnPaths = {
  name: 'Your own path data',
  render: () => <IconOwnPaths />,
} satisfies StoryLiteStoryDefinition<IconArgs>;

const CODE = `import { Icon } from '@drizztdourden08/tessera';
import swordsIcon from '@iconify-icons/lucide/swords';

<Icon name="gamepad-2" />
<Icon name="arrow-right" size={24} rotate={90} />
<Icon name="trash-2" label="Delete preset" />
<Icon name="search" effect="twinkle" />
<Icon name="settings" effect={{ kind: 'ping', every: 2000, color: 'secondary' }} />
<Icon name="star" effect={{ kind: 'comet', size: 'lg' }} />
<Icon icon={swordsIcon} />
<Icon path={{ d: 'M1 3h5l2 2h7v8H1z' }} label="Folder" />
<Icon.Brand name="rotp" size={32} />`;

const Overview = overviewStory({
  component: 'Icon',
  description: 'The icon every app shares: a named Lucide icon, or any @iconify icon, drawn from data bundled with the app.',
  points: [
    '`name` picks from the named set; `icon` takes any @iconify icon you import.',
    '`path` draws an icon of your own: `d` takes path data, `circles` circles, `viewBox` the grid, 16 by default.',
    'It draws in `currentColor`, so it takes the colour of the text around it.',
    '`size`, `rotate` in quarter turns and `flip` set how it sits.',
    '**Label it when it stands alone:** without a `label`, assistive tech skips it.',
    '`effect` lands a small pop every few seconds, such as a twinkle; reduced motion turns it off.',
  ],
  instead: '[EmojiIcon] for a colour emoji.',
  playground: Playground,
  variants: [NamedSet, Transforms, Effects, AnyIcon, OwnPaths],
  code: CODE,
});

export default meta;
export { AnyIcon, Effects, NamedSet, Overview, OwnPaths, Playground, Transforms };
