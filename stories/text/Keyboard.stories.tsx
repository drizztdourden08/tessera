/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, KEYBOARD_PLATFORMS, Keyboard, MOUSE_SPECS, Text } from '../../src/primitives';
import type { KeyboardKey, KeyboardPlatform, MouseButton } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type KeyboardArgs = {
  keys: string;
  platform: KeyboardPlatform;
};

type KeyRow = {
  keys: KeyboardKey | readonly KeyboardKey[];
  platform?: KeyboardPlatform;
};

const ARG_TYPES: StoryLiteArgTypes<KeyboardArgs> = {
  keys: { control: 'text', description: 'Key names, comma separated. More than one makes a combination.' },
  platform: { control: 'select', options: [...KEYBOARD_PLATFORMS], description: 'Mac symbols or PC words. Auto follows the device.' },
};

const meta = {
  title: 'Text/Keyboard',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<KeyboardArgs>;

const keyList = (text: string): KeyboardKey[] =>
  text.split(',').map((part) => part.trim()).filter(Boolean) as KeyboardKey[];

const rowLabel = (row: KeyRow): string => {
  const { keys, platform } = row;
  const names = typeof keys === 'string' ? keys : keys.join(' + ');
  return platform ? `${names}, ${platform}` : names;
};

const KeyRows = (props: { rows: readonly KeyRow[] }) => {
  const { rows } = props;
  return (
    <Box className="story-list">
      {rows.map((row) => (
        <Box key={rowLabel(row)} className="story-list__item">
          <Text className="story-label">{rowLabel(row)}</Text>
          <Box><Keyboard keys={row.keys} platform={row.platform ?? 'windows'} /></Box>
        </Box>
      ))}
    </Box>
  );
};

const rowsStory = (name: string, rows: readonly KeyRow[]) => ({
  name,
  render: () => <KeyRows rows={rows} />,
}) satisfies StoryLiteStoryDefinition<KeyboardArgs>;

const bothPlatforms = (keys: readonly KeyboardKey[]): KeyRow[] =>
  keys.flatMap((key): KeyRow[] => [{ keys: key, platform: 'windows' }, { keys: key, platform: 'mac' }]);

const Playground = {
  name: 'Playground',
  args: { keys: 'ctrl, shift, P', platform: 'auto' },
  argTypes: ARG_TYPES,
  render: (args) => <Keyboard keys={keyList(args.keys)} platform={args.platform} />,
} satisfies StoryLiteStoryDefinition<KeyboardArgs>;

const SingleKeys = rowsStory('Single keys', [
  { keys: 'A' }, { keys: '7' }, { keys: '/' }, { keys: 'F12' }, { keys: 'esc' }, { keys: 'delete' },
]);

const Modifiers = rowsStory('Modifiers', bothPlatforms(['ctrl', 'alt', 'shift', 'meta', 'mod', 'fn']));

const WideKeys = rowsStory('Wide keys', bothPlatforms(['shift', 'enter', 'backspace', 'tab', 'capslock', 'space']));

const Arrows = rowsStory('Arrows and page keys', [
  { keys: 'up' }, { keys: 'down' }, { keys: 'left' }, { keys: 'right' },
  ...bothPlatforms(['home', 'end', 'pageup', 'pagedown']),
]);

const Combinations = rowsStory('Combinations', [
  { keys: ['ctrl', 'S'], platform: 'windows' },
  { keys: ['ctrl', 'shift', 'P'], platform: 'windows' },
  { keys: ['ctrl', 'alt', 'delete'], platform: 'windows' },
  { keys: ['mod', 'shift', 'P'], platform: 'mac' },
  { keys: ['ctrl', 'option', 'cmd', 'space'], platform: 'mac' },
]);

const MouseButtons = rowsStory('Mouse buttons', (Object.keys(MOUSE_SPECS) as MouseButton[]).map((button) => ({ keys: button })));

const KeysAndMouse = rowsStory('Keys with the mouse', [
  { keys: ['ctrl', 'mouse-left'], platform: 'windows' },
  { keys: ['shift', 'mouse-wheel-down'], platform: 'windows' },
  { keys: ['alt', 'mouse-right'], platform: 'windows' },
  { keys: ['cmd', 'mouse-left'], platform: 'mac' },
]);

const InSentence = {
  name: 'In a sentence',
  render: () => (
    <Text.P>
      Press <Keyboard keys={['ctrl', 'S']} platform="windows" /> to save the state, hold <Keyboard keys="shift" platform="windows" /> to
      run, and roll the <Keyboard keys="mouse-wheel-up" /> to zoom the map. A <Keyboard keys="mouse-middle" /> on a room pins it.
    </Text.P>
  ),
} satisfies StoryLiteStoryDefinition<KeyboardArgs>;

const Overview = overviewStory({
  component: 'Keyboard (Kbd)',
  importName: 'Keyboard',
  description: 'A key, a shortcut or a mouse button, drawn as keycaps. Pass keys a key name, or an array for a combination; the component places the joiner between keys. Letters, digits, punctuation and F1 to F24 work as they are. Modifiers, wide keys and arrows have their own shape and symbol. Mouse buttons draw a mouse with the pressed button filled, and mix with keys in one combination. Platform picks the Mac symbols with no joiner, or the PC words joined with a plus. The default follows the device, and mod is Command on a Mac and Ctrl elsewhere. Screen readers hear the key name.',
  playground: Playground,
  variants: [SingleKeys, Modifiers, WideKeys, Arrows, Combinations, MouseButtons, KeysAndMouse, InSentence],
});

export default meta;
export { Arrows, Combinations, InSentence, KeysAndMouse, Modifiers, MouseButtons, Overview, Playground, SingleKeys, WideKeys };
