/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CONTROLLER_LAYOUT_VARIANTS, CONTROLLER_SLOT_IDS, ControllerLayout } from '../../src/composites';
import type { ControllerExtra, ControllerLayoutVariant, ControllerSlotId, ControllerSlots } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { labelledSlots } from './_samples/controller-slots';
import { LiveControllerLayout } from './_samples/LiveControllerLayout';
import './ControllerLayout.stories.css';

type CardWidth = 'small card' | 'large card';

type ControllerArgs = {
  variant: ControllerLayoutVariant;
  held: readonly ControllerSlotId[];
  glyphs: boolean;
  leftX: number;
  leftY: number;
  leftTrigger: number;
  rightTrigger: number;
  width: CardWidth;
};

const WIDTH_CLASS: Record<CardWidth, string> = { 'small card': 'controller-story--sm', 'large card': 'controller-story--lg' };

const PADDLES: readonly ControllerExtra[] = [
  { id: 'paddle1', label: 'Upper right paddle', pressed: true },
  { id: 'paddle2', label: 'Upper left paddle' },
  { id: 'paddle3', label: 'Lower right paddle' },
  { id: 'misc2', label: 'Touchpad click' },
];

const ARGS: Partial<ControllerArgs> = {
  variant: 'offset', held: ['face.south', 'dpad.left'], glyphs: true, leftX: 0.4, leftY: 0.3, leftTrigger: 0.6, rightTrigger: 0, width: 'small card',
};

const ARG_TYPES: PlaygroundArgTypes<ControllerArgs> = {
  glyphs: { group: 'Content', control: 'boolean', description: 'Gives each control the glyph of the pad family, as the host would.' },
  variant: { group: 'Appearance', control: 'select', options: [...CONTROLLER_LAYOUT_VARIANTS] },
  width: { group: 'Appearance', control: 'select', options: ['small card', 'large card'], description: 'The width of the card around it.' },
  held: { group: 'State', control: 'multiselect', options: [...CONTROLLER_SLOT_IDS], description: 'Slots held down right now.' },
  leftX: { group: 'Value', control: 'range', min: -1, max: 1, step: 0.05, description: 'Left stick across, -1 at the left.' },
  leftY: { group: 'Value', control: 'range', min: -1, max: 1, step: 0.05, description: 'Left stick up, 1 at the top.' },
  leftTrigger: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05 },
  rightTrigger: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05 },
};

const meta = {
  title: 'Composites · Input devices/ControllerLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ControllerArgs>;

const playgroundSlots = (args: ControllerArgs): ControllerSlots => {
  const base: ControllerSlots = args.glyphs ? labelledSlots(args.variant) : {};
  const held = Object.fromEntries(args.held.map((id) => [id, { ...base[id], pressed: true }]));
  return {
    ...base, ...held,
    'stick.left': { x: args.leftX, y: args.leftY },
    'trigger.left': { ...base['trigger.left'], value: args.leftTrigger },
    'trigger.right': { ...base['trigger.right'], value: args.rightTrigger },
  };
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className={WIDTH_CLASS[args.width]}>
      <ControllerLayout variant={args.variant} slots={playgroundSlots(args)} />
    </Box>
  ),
} satisfies PlaygroundStory<ControllerArgs>;

const Live = {
  name: 'A pad being played',
  render: () => <Box className="controller-story--sm"><LiveControllerLayout /></Box>,
} satisfies StoryLiteStoryDefinition<ControllerArgs>;

const variantStory = (variant: ControllerLayoutVariant, name: string, held: readonly ControllerSlotId[]) => ({
  name,
  render: () => (
    <Box className="controller-story--sm">
      <ControllerLayout variant={variant} slots={{ ...labelledSlots(variant, held), 'stick.right': { x: 0.6, y: -0.4 } }} />
    </Box>
  ),
}) satisfies StoryLiteStoryDefinition<ControllerArgs>;

const Offset = variantStory('offset', 'Offset sticks, Xbox glyphs', ['face.south', 'shoulder.right']);
const Symmetric = variantStory('symmetric', 'Symmetric sticks, PlayStation glyphs', ['face.north', 'dpad.up']);
const Nintendo = variantStory('nintendo', 'Nintendo body, Switch glyphs', ['face.east', 'meta.menu']);
const Pad = variantStory('pad', 'A pad with no sticks, SNES glyphs', ['face.west', 'dpad.down']);

const Fallback = {
  name: 'Inputs the outline has no place for',
  render: () => (
    <Box className="controller-story--sm">
      <ControllerLayout
        variant="pad"
        slots={{ ...labelledSlots('pad', ['face.south']), 'trigger.left': { value: 0.45 }, 'stick.left': { x: 0.5, y: 0.5 } }}
        extras={PADDLES}
      />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ControllerArgs>;

const Sizes = {
  name: 'At a small and a large card',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">small card</Text>
      <Box className="controller-story--sm"><LiveControllerLayout variant="symmetric" /></Box>
      <Text className="story-label">large card</Text>
      <Box className="controller-story--lg"><LiveControllerLayout variant="nintendo" /></Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ControllerArgs>;

const renderState = (props: StateProps) => (
  <Box className="controller-story--sm">
    <ControllerLayout variant="offset" slots={labelledSlots('offset', Array.isArray(props.held) ? props.held : [])} />
  </Box>
);

const CODE = `import { ControllerLayout } from '@drizztdourden08/tessera';

<ControllerLayout
  variant="offset"
  slots={{
    'face.south': { pressed: true, label: 'A' },
    'trigger.left': { value: 0.6 },
    'stick.left': { x: 0.4, y: 0.3 },
  }}
  extras={[{ id: 'paddle1', label: 'Upper right paddle' }]}
/>`;

const Overview = overviewStory({
  component: 'ControllerLayout',
  description: 'A plain outline of a controller with every input in its place, lit while it is held, like a console test screen.',
  points: [
    '`variant` picks the body: `offset`, `symmetric`, `nintendo`, or `pad` with no sticks or triggers.',
    '`slots` takes a state per input, keyed by its place such as `face.south`. A slot not given is drawn idle.',
    'Triggers and shoulders fill with `value` from 0 to 1. Sticks move with `x` and `y` from -1 to 1, `y` up.',
    'A `label` or a `glyph` shows on or beside its control.',
    'A slot the variant has no place for, and each entry of `extras`, shows as a row in a list under it.',
    'It grows with its card up to 640 px wide.',
  ],
  playground: Playground,
  variants: [Live, Offset, Symmetric, Nintendo, Pad, Fallback, Sizes],
  states: {
    render: renderState,
    list: [
      { name: 'Idle' },
      { name: 'One held', props: { held: ['face.south'] } },
      { name: 'Several held', props: { held: ['face.north', 'dpad.right', 'shoulder.left', 'meta.menu'] } },
    ],
  },
  code: CODE,
});

export default meta;
export { Fallback, Live, Nintendo, Offset, Overview, Pad, Playground, Sizes, Symmetric };
