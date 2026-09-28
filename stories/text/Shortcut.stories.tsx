/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, MOUSE_SPECS, SHORTCUT_LEGENDS, Shortcut, Text } from '../../src/primitives';
import type { MouseButton, ShortcutKey, ShortcutKeys, ShortcutLegend } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type ShortcutArgs = {
  keys: string;
  mouse: MouseButton | 'none';
  legend: ShortcutLegend;
};

type ShortcutRow = {
  keys?: ShortcutKeys;
  mouse?: MouseButton;
  legend?: ShortcutLegend;
};

const MOUSE_BUTTONS = Object.keys(MOUSE_SPECS) as MouseButton[];

const ARG_TYPES: StoryLiteArgTypes<ShortcutArgs> = {
  keys: { control: 'text', description: 'Key names, comma separated. More than one makes a combination.' },
  mouse: { control: 'select', options: ['none', ...MOUSE_BUTTONS], description: 'One mouse button, placed after the keys.' },
  legend: { control: 'select', options: [...SHORTCUT_LEGENDS], description: 'The printed word or the key symbol.' },
};

const meta = {
  title: 'Text/Shortcut',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ShortcutArgs>;

const keyList = (text: string): ShortcutKey[] =>
  text.split(',').map((part) => part.trim()).filter(Boolean) as ShortcutKey[];

const rowLabel = (row: ShortcutRow): string => {
  const { keys = [], mouse } = row;
  const names = [...(typeof keys === 'string' ? [keys] : keys), ...(mouse ? [`mouse ${mouse}`] : [])];
  return names.join(' + ');
};

const ShortcutRows = (props: { rows: readonly ShortcutRow[] }) => {
  const { rows } = props;
  return (
    <Box className="story-list">
      {rows.map((row) => (
        <Box key={rowLabel(row)} className="story-list__item">
          <Text className="story-label">{rowLabel(row)}</Text>
          <Box>{row.mouse ? <Shortcut keys={row.keys} mouse={row.mouse} legend={row.legend} /> : <Shortcut keys={row.keys ?? []} legend={row.legend} />}</Box>
        </Box>
      ))}
    </Box>
  );
};

const rowsStory = (name: string, rows: readonly ShortcutRow[]) => ({
  name,
  render: () => <ShortcutRows rows={rows} />,
}) satisfies StoryLiteStoryDefinition<ShortcutArgs>;

const withLegend = (legend: ShortcutLegend, keys: readonly ShortcutKey[]): ShortcutRow[] => keys.map((key) => ({ keys: key, legend }));

const LEGEND_KEYS: readonly ShortcutKey[] = ['ctrl', 'alt', 'shift', 'cmd', 'enter', 'tab', 'backspace', 'delete', 'capslock', 'esc', 'home', 'end', 'pageup'];

const Playground = {
  name: 'Playground',
  args: { keys: 'ctrl, shift', mouse: 'left', legend: 'label' },
  argTypes: ARG_TYPES,
  render: (args) => (args.mouse === 'none'
    ? <Shortcut keys={keyList(args.keys)} legend={args.legend} />
    : <Shortcut keys={keyList(args.keys)} mouse={args.mouse} legend={args.legend} />),
} satisfies StoryLiteStoryDefinition<ShortcutArgs>;

const Labels = rowsStory('Key labels', [...withLegend('label', LEGEND_KEYS), { keys: 'A' }, { keys: '7' }, { keys: '/' }, { keys: 'F12' }]);

const Symbols = rowsStory('Key symbols', withLegend('symbol', LEGEND_KEYS));

const WideKeys = rowsStory('Wide keys', [
  ...withLegend('label', ['shift', 'enter', 'backspace', 'tab', 'capslock', 'space']),
]);

const Arrows = rowsStory('Arrows', [{ keys: 'up' }, { keys: 'down' }, { keys: 'left' }, { keys: 'right' }]);

const Combinations = rowsStory('Combinations', [
  { keys: ['ctrl', 'S'] },
  { keys: ['ctrl', 'shift', 'P'] },
  { keys: ['ctrl', 'alt', 'delete'] },
  { keys: ['cmd', 'shift', 'P'], legend: 'symbol' },
  { keys: ['ctrl', 'option', 'cmd', 'space'], legend: 'symbol' },
]);

const MouseButtons = rowsStory('Mouse buttons', MOUSE_BUTTONS.map((mouse) => ({ mouse })));

const KeysAndMouse = rowsStory('Keys with a mouse button', [
  { keys: 'ctrl', mouse: 'left' },
  { keys: 'shift', mouse: 'wheel-down' },
  { keys: ['ctrl', 'alt'], mouse: 'right' },
  { keys: 'shift', mouse: 'back' },
  { keys: 'cmd', mouse: 'left', legend: 'symbol' },
]);

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
  description: 'A key, a key combination or a mouse button, drawn as keycaps. Pass keys a key name, or an array for a combination. Pass mouse one mouse button. Keys come first, then the mouse button, and the component places a plus between them. Letters, digits, punctuation and F1 to F24 work as they are. Wide keys are drawn wider, and arrows and Command always show their symbol. Legend picks the printed word or the key symbol for the other keys. The mouse icons come from Phosphor, and each mouse button sits in a cap the size of a key. Screen readers hear the key name, and selecting the text around a shortcut leaves the keycaps out.',
  playground: Playground,
  variants: [Labels, Symbols, WideKeys, Arrows, Combinations, MouseButtons, KeysAndMouse, InSentence],
});

export default meta;
export { Arrows, Combinations, InSentence, KeysAndMouse, Labels, MouseButtons, Overview, Playground, Symbols, WideKeys };
