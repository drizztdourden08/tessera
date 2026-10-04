/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, CAP_WIDTHS, SHORTCUT_LEGENDS, SHORTCUT_SIZES, SHORTCUT_STATES, Shortcut, Text } from '../../src/primitives';
import type { CapWidth, MouseButton, ShortcutKey, ShortcutLegend, ShortcutSize, ShortcutState } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import {
  ANIMATED_ROWS, CAP_WIDTH_ROWS, COMBINATION_ROWS, KEYS_AND_MOUSE_ROWS, MOUSE_BUTTONS, PRINTABLE_KEYS, SHORTCUT_KEY_OPTIONS,
} from './_samples/shortcut-samples';
import type { ShortcutRow } from './_samples/shortcut-samples';
import { ShortcutFillDemo } from './_samples/ShortcutFillDemo';
import { ShortcutLegendTable } from './_samples/ShortcutLegendTable';
import { ShortcutRows } from './_samples/ShortcutRows';

type ShortcutArgs = {
  keys: readonly ShortcutKey[];
  mouse: MouseButton | 'none';
  legend: ShortcutLegend;
  width: CapWidth | 'natural';
  animate: boolean;
  state: ShortcutState | 'none';
  fill: boolean;
  size: ShortcutSize;
};

const ARG_TYPES: PlaygroundArgTypes<ShortcutArgs> = {
  keys: { group: 'Content', control: 'multiselect', options: SHORTCUT_KEY_OPTIONS, description: 'Keys in the order you pick them. More than one makes a combination.' },
  mouse: { group: 'Content', control: 'select', options: ['none', ...MOUSE_BUTTONS], description: 'One mouse button, placed after the keys.' },
  legend: { group: 'Appearance', control: 'select', options: [...SHORTCUT_LEGENDS], description: 'The printed word, the key symbol or the plain arrow. A key without it falls back to its label.' },
  size: { group: 'Appearance', control: 'select', options: [...SHORTCUT_SIZES], description: 'md for text and lists, xs for compact panels.' },
  width: { group: 'Layout', control: 'select', options: ['natural', ...CAP_WIDTHS], description: 'The cap width. Natural keeps each key at its own width.' },
  fill: { group: 'Layout', control: 'boolean', description: 'Stretches the caps to fill their box, shown here in a fixed box.' },
  state: { group: 'State', control: 'select', options: ['none', ...SHORTCUT_STATES], description: 'Idle, lit in the primary colour, or pressed down.' },
  animate: { group: 'Motion', control: 'boolean', description: 'Presses and releases in a loop. It wins over state while it runs.' },
};

const meta = {
  title: 'Core · Text/Shortcut',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ShortcutArgs>;

const STATE_NAMES: Readonly<Record<ShortcutState, string>> = { idle: 'Idle', lit: 'Lit', pressed: 'Pressed' };

const rowsStory = (name: string, rows: readonly ShortcutRow[]) => ({
  name,
  render: () => <ShortcutRows rows={rows} />,
}) satisfies StoryLiteStoryDefinition<ShortcutArgs>;

const Playground = {
  name: 'Playground',
  args: { keys: ['ctrl', 'shift'], mouse: 'left', legend: 'label', width: 'natural', animate: false, state: 'none', fill: false, size: 'md' },
  argTypes: ARG_TYPES,
  render: (args) => {
    const look = {
      legend: args.legend,
      width: args.width === 'natural' ? undefined : args.width,
      animate: args.animate || undefined,
      state: args.state === 'none' ? undefined : args.state,
      fill: args.fill || undefined,
      size: args.size,
    };
    const shortcut = args.mouse === 'none'
      ? <Shortcut keys={args.keys} {...look} />
      : <Shortcut keys={args.keys} mouse={args.mouse} {...look} />;
    return args.fill ? <Box className="shortcut-fill__stage">{shortcut}</Box> : shortcut;
  },
} satisfies PlaygroundStory<ShortcutArgs>;

const Legends = {
  name: 'Legends',
  render: () => (
    <Box className="story-column">
      <Text variant="subtitle">Normal caps</Text>
      <ShortcutLegendTable width="normal" />
      <Text variant="subtitle">Wide caps</Text>
      <ShortcutLegendTable width="wide" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ShortcutArgs>;

const CapWidths = rowsStory('Cap widths', CAP_WIDTH_ROWS);

const PrintableKeys = {
  name: 'Letters, digits, punctuation and F keys',
  render: () => (
    <Box className="story-inline">
      {PRINTABLE_KEYS.map((key) => <Shortcut key={key} keys={key} />)}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ShortcutArgs>;

const Arrows = rowsStory('Arrows and page keys', [
  { keys: 'up' }, { keys: 'down' }, { keys: 'left' }, { keys: 'right' },
  { keys: 'pageup' }, { keys: 'pagedown' }, { keys: 'esc' }, { keys: 'win' }, { keys: 'space' },
]);

const Combinations = rowsStory('Combinations', COMBINATION_ROWS);

const MouseButtons = rowsStory('Mouse buttons', MOUSE_BUTTONS.map((mouse) => ({ mouse })));

const KeysAndMouse = rowsStory('Keys with a mouse button', KEYS_AND_MOUSE_ROWS);

const Animated = rowsStory('Animated', ANIMATED_ROWS);

const SIZE_SAMPLES: Readonly<Record<string, readonly ShortcutKey[]>> = {
  'Ctrl + S': ['ctrl', 'S'], Shift: ['shift'], Esc: ['esc'], Space: ['space'], 'Alt + arrows': ['alt', 'left', 'right'],
};

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(Object.keys(SIZE_SAMPLES))}
      columns={axis(SHORTCUT_SIZES)}
      cell={(sample, size) => <Shortcut keys={SIZE_SAMPLES[sample] ?? []} size={size} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<ShortcutArgs>;

const Filled = {
  name: 'Filling a box',
  render: () => <ShortcutFillDemo />,
} satisfies StoryLiteStoryDefinition<ShortcutArgs>;

const InSentence = {
  name: 'In a sentence',
  render: () => (
    <Text.P>
      Press <Shortcut keys={['ctrl', 'S']} /> to save the state, hold <Shortcut keys="shift" /> to run, and roll
      the <Shortcut mouse="wheel-up" /> to zoom the map. <Shortcut keys="ctrl" mouse="left" /> on a room pins it,
      and the <Shortcut mouse="back" /> button goes to the last screen.
    </Text.P>
  ),
} satisfies StoryLiteStoryDefinition<ShortcutArgs>;

const renderState = (props: StateProps) => <Shortcut keys={['ctrl', 'S']} mouse="left" {...props} />;

const Overview = overviewStory({
  component: 'Shortcut (Sc)',
  importName: 'Shortcut',
  description: 'Keycaps for a key, a key combination or a mouse button, such as [[Ctrl+S]].',
  points: [
    '`keys` takes a key name, or an array for a combination; `mouse` adds one mouse button after the keys.',
    '`legend` picks what a key shows: its label, its symbol or its plain arrow.',
    '`size="md"` suits text and lists; `xs` suits compact panels.',
    '`state` holds idle, lit or pressed; `animate` presses and releases in a loop and wins over `state`.',
    'Screen readers hear the key names, and selecting the text around it leaves the keycaps out.',
  ],
  playground: Playground,
  variants: [
    Legends, CapWidths, PrintableKeys, Arrows, Combinations, MouseButtons, KeysAndMouse, Animated, Sizes, Filled, InSentence,
  ],
  states: {
    render: renderState,
    list: SHORTCUT_STATES.map((state) => ({ name: STATE_NAMES[state], props: { state } })),
  },
});

export default meta;
export {
  Animated, Arrows, CapWidths, Combinations, Filled, InSentence, KeysAndMouse, Legends, MouseButtons, Overview,
  Playground, PrintableKeys, Sizes,
};
