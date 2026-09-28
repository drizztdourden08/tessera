/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, CAP_WIDTHS, SHORTCUT_LEGENDS, Shortcut, Text } from '../../src/primitives';
import type { CapWidth, MouseButton, ShortcutKey, ShortcutLegend } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import {
  ANIMATED_ROWS, CAP_WIDTH_ROWS, COMBINATION_ROWS, KEYS_AND_MOUSE_ROWS, MOUSE_BUTTONS, PRINTABLE_KEYS,
} from './_samples/shortcut-samples';
import type { ShortcutRow } from './_samples/shortcut-samples';
import { ShortcutLegendTable } from './_samples/ShortcutLegendTable';
import { ShortcutRows } from './_samples/ShortcutRows';

type ShortcutArgs = {
  keys: string;
  mouse: MouseButton | 'none';
  legend: ShortcutLegend;
  width: CapWidth | 'natural';
  animate: boolean;
};

const ARG_TYPES: StoryLiteArgTypes<ShortcutArgs> = {
  keys: { control: 'text', description: 'Key names, comma separated. More than one makes a combination.' },
  mouse: { control: 'select', options: ['none', ...MOUSE_BUTTONS], description: 'One mouse button, placed after the keys.' },
  legend: { control: 'select', options: [...SHORTCUT_LEGENDS], description: 'The printed word, the key symbol or the plain arrow. A key without it falls back to its label.' },
  width: { control: 'select', options: ['natural', ...CAP_WIDTHS], description: 'The cap width. Natural keeps each key at its own width.' },
  animate: { control: 'boolean', description: 'Presses and releases in a loop.' },
};

const meta = {
  title: 'Text/Shortcut',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ShortcutArgs>;

const keyList = (text: string): ShortcutKey[] =>
  text.split(',').map((part) => part.trim()).filter(Boolean) as ShortcutKey[];

const rowsStory = (name: string, rows: readonly ShortcutRow[]) => ({
  name,
  render: () => <ShortcutRows rows={rows} />,
}) satisfies StoryLiteStoryDefinition<ShortcutArgs>;

const Playground = {
  name: 'Playground',
  args: { keys: 'ctrl, shift', mouse: 'left', legend: 'label', width: 'natural', animate: false },
  argTypes: ARG_TYPES,
  render: (args) => {
    const look = { legend: args.legend, width: args.width === 'natural' ? undefined : args.width, animate: args.animate || undefined };
    return args.mouse === 'none'
      ? <Shortcut keys={keyList(args.keys)} {...look} />
      : <Shortcut keys={keyList(args.keys)} mouse={args.mouse} {...look} />;
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

const Overview = overviewStory({
  component: 'Shortcut (Sc)',
  importName: 'Shortcut',
  description: 'A key, a key combination or a mouse button. Pass keys a key name, or an array for a combination, and mouse one mouse button. Keys come first, then the mouse button, with a plus between them. Letters, digits, punctuation and F1 to F24 work as they are. Legend picks what a key shows: its label, its symbol or its plain arrow, and a key without that legend shows its label. Width sets the cap to normal or wide; by default each key keeps its own width. A mouse button has no cap: the mouse is drawn in the text colour and the pressed part in the primary colour. Animate presses and releases in a loop, all together in a combination. Screen readers hear the key name, and selecting the text around a shortcut leaves the keycaps out. The mouse and key icons come from Phosphor.',
  playground: Playground,
  variants: [Legends, CapWidths, PrintableKeys, Arrows, Combinations, MouseButtons, KeysAndMouse, Animated, InSentence],
});

export default meta;
export {
  Animated, Arrows, CapWidths, Combinations, InSentence, KeysAndMouse, Legends, MouseButtons, Overview, Playground,
  PrintableKeys,
};
