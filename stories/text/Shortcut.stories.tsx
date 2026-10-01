/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, CAP_WIDTHS, SHORTCUT_LEGENDS, SHORTCUT_SIZES, SHORTCUT_STATES, Shortcut, Text } from '../../src/primitives';
import type { CapWidth, MouseButton, ShortcutKey, ShortcutLegend, ShortcutSize, ShortcutState } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import {
  ANIMATED_ROWS, CAP_WIDTH_ROWS, COMBINATION_ROWS, KEYS_AND_MOUSE_ROWS, MOUSE_BUTTONS, PRINTABLE_KEYS,
} from './_samples/shortcut-samples';
import type { ShortcutRow } from './_samples/shortcut-samples';
import { ShortcutFillDemo } from './_samples/ShortcutFillDemo';
import { ShortcutLegendTable } from './_samples/ShortcutLegendTable';
import { ShortcutRows } from './_samples/ShortcutRows';

type ShortcutArgs = {
  keys: string;
  mouse: MouseButton | 'none';
  legend: ShortcutLegend;
  width: CapWidth | 'natural';
  animate: boolean;
  state: ShortcutState | 'none';
  fill: boolean;
  size: ShortcutSize;
};

const ARG_TYPES: StoryLiteArgTypes<ShortcutArgs> = {
  keys: { control: 'text', description: 'Key names, comma separated. More than one makes a combination.' },
  mouse: { control: 'select', options: ['none', ...MOUSE_BUTTONS], description: 'One mouse button, placed after the keys.' },
  legend: { control: 'select', options: [...SHORTCUT_LEGENDS], description: 'The printed word, the key symbol or the plain arrow. A key without it falls back to its label.' },
  width: { control: 'select', options: ['natural', ...CAP_WIDTHS], description: 'The cap width. Natural keeps each key at its own width.' },
  animate: { control: 'boolean', description: 'Presses and releases in a loop. It wins over state while it runs.' },
  state: { control: 'select', options: ['none', ...SHORTCUT_STATES], description: 'Idle, lit in the primary colour, or pressed down.' },
  fill: { control: 'boolean', description: 'Stretches the caps to fill their box, shown here in a fixed box.' },
  size: { control: 'select', options: [...SHORTCUT_SIZES], description: 'md for text and lists, xs for compact panels.' },
};

const meta = {
  title: 'Text/Shortcut',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ShortcutArgs>;

const STATE_NAMES: Readonly<Record<ShortcutState, string>> = { idle: 'Idle', lit: 'Lit', pressed: 'Pressed' };

const keyList = (text: string): ShortcutKey[] =>
  text.split(',').map((part) => part.trim()).filter(Boolean) as ShortcutKey[];

const rowsStory = (name: string, rows: readonly ShortcutRow[]) => ({
  name,
  render: () => <ShortcutRows rows={rows} />,
}) satisfies StoryLiteStoryDefinition<ShortcutArgs>;

const Playground = {
  name: 'Playground',
  args: { keys: 'ctrl, shift', mouse: 'left', legend: 'label', width: 'natural', animate: false, state: 'none', fill: false, size: 'md' },
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
      ? <Shortcut keys={keyList(args.keys)} {...look} />
      : <Shortcut keys={keyList(args.keys)} mouse={args.mouse} {...look} />;
    return args.fill ? <Box className="shortcut-fill__stage">{shortcut}</Box> : shortcut;
  },
} satisfies StoryLiteStoryDefinition<ShortcutArgs>;

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
  description: 'A key, a key combination or a mouse button. Pass keys a key name, or an array for a combination, and mouse one mouse button. Keys come first, then the mouse button, with a plus between them. Letters, digits, punctuation and F1 to F24 work as they are. Legend picks what a key shows: its label, its symbol or its plain arrow, and a key without that legend shows its label. Width sets the cap to normal or wide; by default each key keeps its own width. A mouse button has no cap: the mouse is drawn in the text colour and the pressed part in the primary colour. Animate presses and releases in a loop, all together in a combination. State holds one look instead: idle, lit in the primary colour, or pressed down, and a change of state eases between the two looks the loop uses. An idle mouse button draws its pressed part in the text colour. While animate runs it wins over state, and with reduced motion both keep the colour change and drop the movement. Size md is for text and lists; xs is the smallest, for compact panels such as the widget shortcut list. Fill stretches the caps to fill their box, which is how a keyboard sizes a key to its width in key units. Screen readers hear the key name, and selecting the text around a shortcut leaves the keycaps out. The mouse and key icons come from Phosphor.',
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
