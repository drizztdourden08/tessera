/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ArmedIcon, Box } from '../../src/primitives';
import type { ArmedIconName } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { ArmedIconRow } from './ArmedIconRow';
import './icons.stories.css';

type ArmedIconTone = 'text' | 'primary' | 'secondary' | 'warning' | 'danger' | 'muted';

type ArmedIconArgs = {
  name: ArmedIconName;
  armed: boolean;
  size: number;
  tone: ArmedIconTone;
};

const ARG_TYPES: PlaygroundArgTypes<ArmedIconArgs> = {
  name: { group: 'Content', control: 'select', options: ['load-state', 'save-state', 'trash-2'] },
  armed: { group: 'State', control: 'boolean', description: 'Morphs to the armed pose, then loops until it turns false.' },
  size: { group: 'Appearance', control: 'number' },
  tone: { group: 'Appearance', control: 'select', options: ['text', 'primary', 'secondary', 'warning', 'danger', 'muted'], description: 'It draws in currentColor.' },
};

const meta = {
  title: 'Core · Icons/ArmedIcon',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ArmedIconArgs>;

const Playground = {
  name: 'Playground',
  args: { name: 'save-state', armed: true, size: 48, tone: 'warning' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className={args.tone === 'text' ? undefined : `icon-demo--${args.tone}`}>
      <ArmedIcon name={args.name} armed={args.armed} size={args.size} />
    </Box>
  ),
} satisfies PlaygroundStory<ArmedIconArgs>;

const StillAndArmed = {
  name: 'Each icon still and armed',
  render: () => <ArmedIconRow />,
} satisfies StoryLiteStoryDefinition<ArmedIconArgs>;

const Overview = overviewStory({
  component: 'ArmedIcon',
  description: 'An icon that waits for a second press: still, it draws like the named set; armed, it loops a short motion.',
  points: [
    'Three drawings: `load-state`, `save-state` and `trash-2`, in the 2 px line of the named set.',
    'Still, each one matches [Icon] with the same name; the named set builds the two state icons from it.',
    '`armed` morphs it, then loops: the load arrow keeps lifting and the save arrow keeps sinking.',
    'The save platform squashes and ripples as the arrow lands; the trash lid keeps lifting.',
    'Only transform and opacity move, so the box stays put; reduced motion shows the armed pose still.',
    '[ArmedIconButton] draws it; it draws in currentColor, so the colour comes from its parent.',
  ],
  instead: '[Icon] for the still `load-state` or `save-state` on a button that acts at once.',
  playground: Playground,
  variants: [StillAndArmed],
});

export default meta;
export { Overview, Playground, StillAndArmed };
