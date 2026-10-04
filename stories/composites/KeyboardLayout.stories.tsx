/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { KEYBOARD_SIZES, KeyboardLayout } from '../../src/composites';
import { KEYBOARD_KEYS } from '../../src/composites/KeyboardLayout/KeyboardLayout.constants';
import type { KeyboardSize, KeyboardTarget } from '../../src/composites';
import { ScrollArea } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import './KeyboardLayout.stories.css';

type KeyboardArgs = {
  highlight: readonly KeyboardTarget[];
  pressed: readonly KeyboardTarget[];
  size: KeyboardSize;
};

const KEY_OPTIONS: readonly KeyboardTarget[] = ['ctrl', 'shift', 'alt', 'win', ...KEYBOARD_KEYS.map((key) => key.id)];

const ARG_TYPES: PlaygroundArgTypes<KeyboardArgs> = {
  size: { group: 'Appearance', control: 'select', options: [...KEYBOARD_SIZES], description: 'Full size, or tenkeyless without the keypad.' },
  highlight: { group: 'State', control: 'multiselect', options: KEY_OPTIONS, description: 'Keys to light. A modifier lights both sides; ctrl-left picks one.' },
  pressed: { group: 'State', control: 'multiselect', options: KEY_OPTIONS, description: 'Keys to draw pressed.' },
};

const meta = {
  title: 'Composites · Input devices/KeyboardLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<KeyboardArgs>;

const Playground = {
  name: 'Playground',
  args: { highlight: ['ctrl', 'shift', 'P'], pressed: ['ctrl-left'], size: 'full' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <ScrollArea axis="x" className="keyboard-story">
      <KeyboardLayout highlight={args.highlight} pressed={args.pressed} size={args.size} />
    </ScrollArea>
  ),
} satisfies PlaygroundStory<KeyboardArgs>;

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
  description: 'A full-size US keyboard drawn from data, with keys lit or pressed, to show where a shortcut sits.',
  points: [
    'Keys take the same names as [Shortcut], so a combination lights the way it is written.',
    '`highlight` lights keys in the primary colour; `pressed` moves them down as held.',
    '`ctrl` lights both sides; `ctrl-left` or `shift-right` picks one.',
    '`size="tenkeyless"` drops the keypad.',
    '`onKeyRects` reports where every key sits, which is how [ShortcutTour] aims its camera.',
  ],
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
