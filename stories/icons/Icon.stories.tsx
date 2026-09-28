/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import swordsIcon from '@iconify-icons/lucide/swords';
import { Box, Icon, ICONS, Text } from '../../src/primitives';
import type { IconFlip, IconName, IconRotation } from '../../src/primitives';
import { APP_ICONS } from '../../src/primitives/icon-sets/app.constants';
import { STATUS_ICONS } from '../../src/primitives/icon-sets/status.constants';
import { INTERFACE_ICONS } from '../../src/primitives/icon-sets/interface.constants';
import { overviewStory } from '../_template/overview-story';
import { IconGallery } from './IconGallery';
import './icons.stories.css';

type IconTone = 'text' | 'primary' | 'secondary' | 'warning' | 'danger' | 'muted';
type FlipChoice = 'none' | IconFlip;

type IconArgs = {
  name: IconName;
  size: number;
  rotate: IconRotation;
  flip: FlipChoice;
  tone: IconTone;
  label: string;
};

const NAMES = Object.keys(ICONS) as IconName[];
const namesOf = (group: object): IconName[] => Object.keys(group) as IconName[];

const ARG_TYPES: StoryLiteArgTypes<IconArgs> = {
  name: { control: 'select', options: NAMES, description: 'A name from the named set.' },
  size: { control: 'number', description: 'Width and height in pixels, or any CSS length.' },
  rotate: { control: 'select', options: [0, 90, 180, 270] },
  flip: { control: 'select', options: ['none', 'horizontal', 'vertical', 'both'] },
  tone: { control: 'select', options: ['text', 'primary', 'secondary', 'warning', 'danger', 'muted'], description: 'Icons draw in currentColor.' },
  label: { control: 'text', description: 'Accessible name. Leave empty for a decorative icon, which is hidden from assistive tech.' },
};

const meta = {
  title: 'Icons/Icon',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<IconArgs>;

const Playground = {
  name: 'Playground',
  args: { name: 'gamepad-2', size: 32, rotate: 0, flip: 'none', tone: 'primary', label: '' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className={args.tone === 'text' ? undefined : `icon-demo--${args.tone}`}>
      <Icon
        name={args.name}
        size={args.size}
        rotate={args.rotate}
        flip={args.flip === 'none' ? undefined : args.flip}
        label={args.label || undefined}
      />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<IconArgs>;

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
    <Box className="story-list">
      {[12, 16, 24, 32, 48].map((size) => (
        <Box key={size} className="story-list__item">
          <Text className="story-label">{`${size}px`}</Text>
          <Icon name="compass" size={size} />
        </Box>
      ))}
      {([0, 90, 180, 270] as const).map((rotate) => (
        <Box key={rotate} className="story-list__item">
          <Text className="story-label">{`rotate ${rotate}`}</Text>
          <Icon name="arrow-right" size={24} rotate={rotate} />
        </Box>
      ))}
      {(['horizontal', 'vertical', 'both'] as const).map((flip) => (
        <Box key={flip} className="story-list__item">
          <Text className="story-label">{`flip ${flip}`}</Text>
          <Icon name="log-in" size={24} flip={flip} />
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<IconArgs>;

const AnyIcon = {
  name: 'Any @iconify icon',
  render: () => (
    <Box className="story-list">
      <Box className="story-list__item">
        <Text className="story-label">icon=&#123;swordsIcon&#125;</Text>
        <Icon icon={swordsIcon} size={32} label="Swords" />
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<IconArgs>;

const CODE = `import { Icon } from '@drizztdourden08/tessera';
import swordsIcon from '@iconify-icons/lucide/swords';

<Icon name="gamepad-2" />
<Icon name="arrow-right" size={24} rotate={90} />
<Icon name="trash-2" label="Delete preset" />
<Icon icon={swordsIcon} />
<Icon.Brand name="rotp" size={32} />`;

const Overview = overviewStory({
  component: 'Icon',
  description: 'The icon every app shares, drawn by @iconify from data bundled with the app, so nothing is fetched. Pass a name from the named set (Lucide icons: the app set Archipelia uses, interface controls, and status and media), or icon= with any @iconify icon you import. It draws in currentColor, so it takes the colour of the text around it, and takes a size, a rotation in quarter turns and a flip. Give it a label when it carries meaning on its own; without one it is hidden from assistive tech. Icon.Brand draws the family marks the same way.',
  playground: Playground,
  variants: [NamedSet, Transforms, AnyIcon],
  code: CODE,
});

export default meta;
export { AnyIcon, NamedSet, Overview, Playground, Transforms };
