/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { KEYBOARD_SIZES, KeyboardLayout } from '../../src/composites';
import type { KeyboardSize, KeyboardTarget } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './KeyboardLayout.stories.css';

type KeyboardArgs = {
  highlight: string;
  pressed: string;
  size: KeyboardSize;
};

const ARG_TYPES: StoryLiteArgTypes<KeyboardArgs> = {
  highlight: { control: 'text', description: 'Key names to light, comma separated. A modifier lights both sides; ctrl-left picks one.' },
  pressed: { control: 'text', description: 'Key names to draw pressed, comma separated.' },
  size: { control: 'select', options: [...KEYBOARD_SIZES], description: 'Full size, or tenkeyless without the keypad.' },
};

const meta = {
  title: 'Composites · Content/KeyboardLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<KeyboardArgs>;

const keyList = (text: string): KeyboardTarget[] =>
  text.split(',').map((part) => part.trim()).filter(Boolean) as KeyboardTarget[];

const Playground = {
  name: 'Playground',
  args: { highlight: 'ctrl, shift, P', pressed: 'ctrl-left', size: 'full' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="keyboard-story">
      <KeyboardLayout highlight={keyList(args.highlight)} pressed={keyList(args.pressed)} size={args.size} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<KeyboardArgs>;

const keyboardStory = (name: string, highlight: readonly KeyboardTarget[], pressed: readonly KeyboardTarget[], size: KeyboardSize = 'full') => ({
  name,
  render: () => (
    <Box className="keyboard-story">
      <KeyboardLayout highlight={highlight} pressed={pressed} size={size} />
    </Box>
  ),
}) satisfies StoryLiteStoryDefinition<KeyboardArgs>;

const Plain = keyboardStory('Plain', [], []);

const Highlighted = keyboardStory('Highlighted combination', ['ctrl', 'shift', 'P'], []);

const Pressed = keyboardStory('Pressed keys', [], ['ctrl-left', 'alt-left', 'delete']);

const Tenkeyless = keyboardStory('Tenkeyless', ['up', 'down', 'left', 'right'], ['space'], 'tenkeyless');

const Overview = overviewStory({
  component: 'KeyboardLayout',
  description: 'A full-size US keyboard drawn from data: the function row, the main block with its real key widths, the navigation and arrow clusters and the keypad with its tall plus and Enter. Keys take the same names as Shortcut, so a combination lights the same way it is written. highlight draws keys in the primary colour, and pressed moves them down as a held key. A bare modifier such as ctrl lights both sides; ctrl-left or shift-right picks one. A shifted character such as ! lights its key. size="tenkeyless" drops the keypad. onKeyRects reports where every key sits, which is how ShortcutTour aims its camera.',
  playground: Playground,
  variants: [Plain, Highlighted, Pressed, Tenkeyless],
});

export default meta;
export { Highlighted, Overview, Plain, Playground, Pressed, Tenkeyless };
