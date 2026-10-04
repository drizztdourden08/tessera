/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { EmphasisAnchor, EmphasisOrder, EmphasisTrigger } from '../../src/primitives';
import { Box, Emphasis, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { ActiveDemo, ButtonDemo, PulseDemo } from './_samples/emphasis-demos';
import { AnchorDemo, WaveOrderDemo } from './_samples/emphasis-orders';
import '../typography/variable-type.css';

type OrderChoice = 'anchor' | 'random' | 'custom';

type EmphasisArgs = {
  text: string;
  trigger: EmphasisTrigger;
  active: boolean;
  from: number;
  to: number;
  duration: number;
  stagger: number;
  anchor: EmphasisAnchor;
  order: OrderChoice;
  customOrder: string;
  seed: number;
  stable: boolean;
};

const ARGS: EmphasisArgs = {
  text: 'Triforce', trigger: 'loop', active: false, from: 300, to: 900, duration: 1200, stagger: 60,
  anchor: 'center', order: 'anchor', customOrder: '0, 7, 1, 6, 2, 5, 3, 4', seed: 7, stable: true,
};

const ARG_TYPES: PlaygroundArgTypes<EmphasisArgs> = {
  text: { group: 'Content', control: 'text' },
  from: { group: 'Appearance', control: 'range', min: 100, max: 900, step: 1, description: 'Resting weight, 100 to 900.' },
  to: { group: 'Appearance', control: 'range', min: 100, max: 900, step: 1, description: 'Emphasized weight, 100 to 900.' },
  stable: { group: 'Layout', control: 'boolean', description: 'Reserves the width of the heavy weight so nothing around it moves.' },
  active: { group: 'State', control: 'boolean', description: 'Holds the heavy weight while true, with trigger active.' },
  trigger: { group: 'Motion', control: 'select', options: ['hover', 'active', 'pulse', 'loop'], description: 'What swells the weight: hovering, the active prop, one pulse, or a loop.' },
  duration: { group: 'Motion', control: 'number', description: 'Milliseconds for one swell.' },
  stagger: { group: 'Motion', control: 'number', description: 'Milliseconds between letters. 0 moves the whole text at once; more makes a wave.' },
  anchor: { group: 'Motion', control: 'select', options: ['left', 'center', 'right'], description: 'Where the text grows from inside its reserved width, and where a wave starts.' },
  order: { group: 'Motion', control: 'select', options: ['anchor', 'random', 'custom'], description: 'Letter order of a wave: out from the anchor, shuffled, or the custom list below.' },
  customOrder: { group: 'Motion', control: 'text', description: 'Letter positions in firing order, from 0. Letters left out follow in reading order.' },
  seed: { group: 'Motion', control: 'number', description: 'Shuffle seed for a random order. The same seed always gives the same order.' },
};

const orderOf = (args: EmphasisArgs): EmphasisOrder => {
  if (args.order !== 'custom') return args.order;
  return args.customOrder.split(',').map((part) => Number(part.trim())).filter((index) => Number.isInteger(index));
};

const meta = {
  title: 'Core · Text/Emphasis animation',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<EmphasisArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Text className="variable-type__size-48">
      <Emphasis
        trigger={args.trigger}
        active={args.active}
        from={args.from}
        to={args.to}
        duration={args.duration}
        stagger={args.stagger}
        anchor={args.anchor}
        order={orderOf(args)}
        seed={args.seed}
        stable={args.stable}
        pulseKey={JSON.stringify(args)}
      >
        {args.text}
      </Emphasis>
    </Text>
  ),
} satisfies PlaygroundStory<EmphasisArgs>;

const Anchors = {
  name: 'Anchors',
  render: () => <AnchorDemo />,
} satisfies StoryLiteStoryDefinition<EmphasisArgs>;

const WaveOrders = {
  name: 'Wave orders',
  render: () => <WaveOrderDemo />,
} satisfies StoryLiteStoryDefinition<EmphasisArgs>;

const Triggers = {
  name: 'Triggers',
  render: () => (
    <Box className="story-row">
      <Text className="variable-type__size-32"><Emphasis>Hover me</Emphasis></Text>
      <ActiveDemo />
      <PulseDemo />
      <Text className="variable-type__size-32"><Emphasis trigger="loop" duration={1600}>Breathing</Emphasis></Text>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<EmphasisArgs>;

const LetterWave = {
  name: 'Letter wave',
  render: () => (
    <Box className="story-column">
      <Text className="variable-type__size-48"><Emphasis trigger="loop" from={200} to={900} duration={1400} stagger={70}>Multiworld</Emphasis></Text>
      <Text className="variable-type__size-32"><Emphasis stagger={30} to={900}>Hover for a wave</Emphasis></Text>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<EmphasisArgs>;

const InContext = {
  name: 'In context',
  render: () => (
    <Box className="story-column">
      <Text className="variable-type__size-20">
        Aria found the <Emphasis trigger="loop" duration={1800} to={750}>Hookshot</Emphasis> in the Swamp Palace, and it went to her world.
      </Text>
      <ButtonDemo />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<EmphasisArgs>;

const CODE = `import { Emphasis } from '@drizztdourden08/tessera';

<Text>
  Aria found the <Emphasis trigger="pulse" pulseKey={receivedCount}>Hookshot</Emphasis>.
</Text>

<Button data-emphasis-scope>
  <Emphasis from={500} to={800}>Start session</Emphasis>
</Button>`;

const Overview = overviewStory({
  component: 'Emphasis',
  description: 'Puts weight on a word by moving it along Inter\'s weight axis, which runs continuously from 100 to 900. It can swell on hover (its own, or any ancestor marked data-emphasis-scope, such as the button it labels), hold while active, pulse once each time pulseKey changes, or breathe in a loop. A stagger turns the swell into a wave that runs letter by letter: out from the anchor (left, center or right), in a seeded random order, or in any order you list. The anchor also sets where the word grows from inside its reserved width, so a word in the middle of a sentence swells from its center by default. By default it reserves the width of the heavy weight, so the words around it never shift, and it stands still for anyone who asks for reduced motion.',
  playground: Playground,
  variants: [Triggers, Anchors, LetterWave, WaveOrders, InContext],
  code: CODE,
});

export default meta;
export { Anchors, InContext, LetterWave, Overview, Playground, Triggers, WaveOrders };
