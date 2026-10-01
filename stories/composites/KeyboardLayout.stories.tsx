/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { KEYBOARD_SIZES, KeyboardLayout } from '../../src/composites';
import type { KeyboardSize, KeyboardTarget } from '../../src/composites';
import { ScrollArea } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
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
    <ScrollArea axis="x" className="keyboard-story">
      <KeyboardLayout highlight={keyList(args.highlight)} pressed={keyList(args.pressed)} size={args.size} />
    </ScrollArea>
  ),
} satisfies StoryLiteStoryDefinition<KeyboardArgs>;

const keyboardStory = (name: string, highlight: readonly KeyboardTarget[], pressed: readonly KeyboardTarget[], size: KeyboardSize = 'full') => ({
  name,
  render: () => (
    <ScrollArea axis="x" className="keyboard-story">
      <KeyboardLayout highlight={highlight} pressed={pressed} size={size} />
    </ScrollArea>
  ),
}) satisfies StoryLiteStoryDefinition<KeyboardArgs>;

const Tenkeyless = keyboardStory('Tenkeyless', ['up', 'down', 'left', 'right'], ['space'], 'tenkeyless');

const LIT: readonly KeyboardTarget[] = ['ctrl', 'shift', 'P'];
const HELD: readonly KeyboardTarget[] = ['ctrl-left', 'alt-left', 'delete'];
const NONE: readonly KeyboardTarget[] = [];

const renderState = (props: StateProps) => (
  <ScrollArea axis="x" className="keyboard-story">
    <KeyboardLayout highlight={props.lit === true ? LIT : NONE} pressed={props.held === true ? HELD : NONE} />
  </ScrollArea>
);

const Overview = overviewStory({
  component: 'KeyboardLayout',
  description: 'A full-size US keyboard drawn from data: the function row, the main block with its real key widths, the navigation and arrow clusters and the keypad with its tall plus and Enter. Keys take the same names as Shortcut, so a combination lights the same way it is written. highlight draws keys in the primary colour, and pressed moves them down as a held key. A bare modifier such as ctrl lights both sides; ctrl-left or shift-right picks one. A shifted character such as ! lights its key. size="tenkeyless" drops the keypad. onKeyRects reports where every key sits, which is how ShortcutTour aims its camera.',
  playground: Playground,
  variants: [Tenkeyless],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { name: 'Lit', props: { lit: true } },
      { name: 'Pressed', props: { held: true } },
    ],
  },
});

export default meta;
export { Overview, Playground, Tenkeyless };
