/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { PressedGrid } from '../../src/composites';
import type { PressedGridItem } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { GAMEPAD_BUTTONS } from './_samples/gamepad-buttons';
import { LivePressedGrid } from './_samples/LivePressedGrid';
import './PressedGrid.stories.css';

type GridArgs = {
  pressed: string;
  friendlyLabels: boolean;
};

const FACE_BUTTONS = GAMEPAD_BUTTONS.slice(0, 4);

const RAW_NAMES: readonly PressedGridItem[] = GAMEPAD_BUTTONS.map(({ id }) => ({ id }));

const LONG_NAMES: readonly PressedGridItem[] = [
  { id: 'paddle1', label: 'Upper right paddle' },
  { id: 'paddle2', label: 'Upper left paddle' },
  { id: 'touchpad', label: 'Touchpad click' },
  { id: 'misc1', label: 'Capture' },
];

const idList = (text: string): string[] => text.split(',').map((part) => part.trim()).filter(Boolean);

const ARGS: Partial<GridArgs> = { pressed: 'a, dpup', friendlyLabels: true };

const ARG_TYPES: StoryLiteArgTypes<GridArgs> = {
  pressed: { control: 'text', description: 'Button ids held down, comma separated: a, b, x, y, dpup, start and so on.' },
  friendlyLabels: { control: 'boolean', description: 'Show a label per button. Off, each cell shows its id.' },
};

const meta = {
  title: 'Composites · Input devices/PressedGrid',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<GridArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <PressedGrid
      className="pressed-grid-story"
      items={args.friendlyLabels ? GAMEPAD_BUTTONS : RAW_NAMES}
      pressed={idList(args.pressed)}
    />
  ),
} satisfies StoryLiteStoryDefinition<GridArgs>;

const Live = {
  name: 'A pad being played',
  render: () => <LivePressedGrid />,
} satisfies StoryLiteStoryDefinition<GridArgs>;

const FaceButtons = {
  name: 'Four face buttons',
  render: () => <PressedGrid className="pressed-grid-story" items={FACE_BUTTONS} pressed={['a']} />,
} satisfies StoryLiteStoryDefinition<GridArgs>;

const LongLabels = {
  name: 'Long labels cut short',
  render: () => <PressedGrid className="pressed-grid-story" items={LONG_NAMES} pressed={['touchpad']} />,
} satisfies StoryLiteStoryDefinition<GridArgs>;

const renderState = (props: StateProps) => (
  <PressedGrid className="pressed-grid-story" items={FACE_BUTTONS} pressed={Array.isArray(props.pressed) ? props.pressed : []} />
);

const CODE = `import { PressedGrid } from '@drizztdourden08/tessera';

<PressedGrid
  items={[
    { id: 'a', label: 'A' },
    { id: 'b', label: 'B' },
    { id: 'start', label: 'Start' },
  ]}
  pressed={heldIds}
/>`;

const Overview = overviewStory({
  component: 'PressedGrid',
  description: 'A grid of cells, one per button, that light up in the primary colour while their button is held. items lists the buttons in order, each with an id, a label and a title for the tooltip; pressed lists the ids held right now. The host reads the device and passes plain ids, so the same grid serves a gamepad, a joystick or any other set of switches. Cells keep a minimum width and wrap to fill the row, and a long label ends in an ellipsis.',
  playground: Playground,
  variants: [Live, FaceButtons, LongLabels],
  states: {
    render: renderState,
    list: [
      { name: 'Idle' },
      { name: 'One held', props: { pressed: ['a'] } },
      { name: 'Several held', props: { pressed: ['a', 'x', 'y'] } },
    ],
  },
  code: CODE,
});

export default meta;
export { FaceButtons, Live, LongLabels, Overview, Playground };
