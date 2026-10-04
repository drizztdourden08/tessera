/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { PressedGrid } from '../../src/composites';
import type { PressedGridItem } from '../../src/composites';
import type { InputIconFamily } from '../../src/primitives';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { GAMEPAD_BUTTONS, GAMEPAD_IDS, KEYBOARD_KEYS } from './_samples/gamepad-buttons';
import { LivePressedGrid } from './_samples/LivePressedGrid';
import './PressedGrid.stories.css';

type FamilyChoice = 'none' | InputIconFamily;

type GridArgs = {
  family: FamilyChoice;
  pressed: readonly string[];
  friendlyLabels: boolean;
};

const PAD_FAMILIES: readonly InputIconFamily[] = ['xbox', 'playstation', 'switch', 'gamecube', 'snes', 'generic'];

const FACE_BUTTONS = GAMEPAD_BUTTONS.slice(0, 4);

const LONG_NAMES: readonly PressedGridItem[] = [
  { id: 'paddle1', label: 'Upper right paddle' },
  { id: 'paddle2', label: 'Upper left paddle' },
  { id: 'touchpad', label: 'Touchpad click' },
  { id: 'misc1', label: 'Capture' },
];

const gridItems = (args: GridArgs): readonly PressedGridItem[] => {
  if (args.friendlyLabels) return GAMEPAD_BUTTONS;
  return args.family === 'keyboard' ? KEYBOARD_KEYS : GAMEPAD_IDS;
};

const ARGS: Partial<GridArgs> = { family: 'xbox', pressed: ['a', 'dpup'], friendlyLabels: false };

const ARG_TYPES: PlaygroundArgTypes<GridArgs> = {
  friendlyLabels: { group: 'Content', control: 'boolean', description: 'Show a label per button, beside its icon. Off, a cell with no icon shows its id.' },
  family: { group: 'Appearance', control: 'select', options: ['none', 'xbox', 'playstation', 'switch', 'gamecube', 'snes', 'generic', 'keyboard'], description: 'Draws each button as an InputIcon of that family, matched from its SDL button id or its KeyboardEvent.code.' },
  pressed: { group: 'State', control: 'multiselect', options: (args) => gridItems(args).map((item) => item.id), description: 'Buttons held down, by id: the ids of the cells the grid shows.' },
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
      family={args.family === 'none' ? undefined : args.family}
      items={gridItems(args)}
      pressed={args.pressed}
    />
  ),
} satisfies PlaygroundStory<GridArgs>;

const Live = {
  name: 'A pad being played',
  render: () => <LivePressedGrid family="xbox" />,
} satisfies StoryLiteStoryDefinition<GridArgs>;

const Families = {
  name: 'One grid per controller family',
  render: () => (
    <Box className="story-column">
      {PAD_FAMILIES.map((family) => (
        <Box key={family} className="story-column">
          <Text className="story-label">{`family="${family}"`}</Text>
          <PressedGrid className="pressed-grid-story" family={family} items={GAMEPAD_IDS} pressed={['a', 'dpleft', 'rightshoulder']} />
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<GridArgs>;

const Keyboard = {
  name: 'Keyboard keys by KeyboardEvent.code',
  render: () => <PressedGrid className="pressed-grid-story" family="keyboard" items={KEYBOARD_KEYS} pressed={['KeyW', 'ShiftLeft']} />,
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
  family="xbox"
  items={[{ id: 'a' }, { id: 'b' }, { id: 'start' }, { id: 'dpup' }]}
  pressed={heldIds}
/>

// Any cell can name its own glyph.
<PressedGrid
  items={[{ id: 'confirm', label: 'Confirm', icon: { family: 'switch', name: 'a' } }]}
  pressed={heldIds}
/>`;

const Overview = overviewStory({
  component: 'PressedGrid',
  description: 'A grid of cells, one per button, that light up in the primary colour while their button is held. items lists the buttons in order, each with an id, a label, a title for the tooltip and an InputIcon; pressed lists the ids held right now. Set family to xbox, playstation, switch, gamecube, snes, generic or keyboard and each cell draws the InputIcon of that family on its own: the ids are SDL button names (a, b, dpup, leftshoulder and so on, a being the bottom face button) or, for keyboard, KeyboardEvent.code values. An icon set on the item wins over the family match, and a cell with no icon shows its label or id. The host reads the device and passes plain ids, so the same grid serves a gamepad, a keyboard or any other set of switches. Cells keep a minimum width and wrap to fill the row, and a long label ends in an ellipsis.',
  playground: Playground,
  variants: [Live, Families, Keyboard, FaceButtons, LongLabels],
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
export { FaceButtons, Families, Keyboard, Live, LongLabels, Overview, Playground };
