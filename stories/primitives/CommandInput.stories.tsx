/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, CommandInput } from '../../src/primitives';
import type { ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { CONSOLE_HISTORY } from './_samples/console-samples.constants';
import { ConsoleDemo } from './_samples/ConsoleDemo';
import './CommandInput.stories.css';

type CommandInputArgs = {
  placeholder: string;
  sendLabel: string;
  keyHints: boolean;
  quick: boolean;
  disabled: boolean;
  size: ControlSize;
};

const ARGS: Partial<CommandInputArgs> = { placeholder: '/hint Bram Moon Pearl', sendLabel: '', keyHints: true, quick: true, disabled: false, size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<CommandInputArgs> = {
  placeholder: { group: 'Content', control: 'text' },
  sendLabel: { group: 'Content', control: 'text', description: 'Replaces Send on the button.' },
  keyHints: { group: 'Appearance', control: 'boolean', description: 'The Up, Down and Esc keys at the end of the row under the input.' },
  quick: { group: 'Content', control: 'boolean', description: 'Two quick command buttons in actions.' },
  disabled: { group: 'State', control: 'boolean' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'] },
};

const meta = {
  title: 'Primitives · Inputs/CommandInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CommandInputArgs>;

const QUICK = (
  <>
    <Button variant="secondary" size="sm">Save</Button>
    <Button variant="secondary" size="sm">Players</Button>
  </>
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: ({ quick, sendLabel, ...args }) => (
    <Box className="command-input-story">
      <CommandInput {...args} sendLabel={sendLabel === '' ? undefined : sendLabel} storageKey="tessera-gallery.command-input" actions={quick ? QUICK : undefined} onSubmit={() => undefined} />
    </Box>
  ),
} satisfies PlaygroundStory<CommandInputArgs>;

const SHAPES = {
  'Plain': { keyHints: false },
  'With key hints': {},
  'With quick commands': { actions: QUICK },
  'Small': { size: 'sm', actions: QUICK },
} as const;

const SHAPE_KEYS = Object.keys(SHAPES) as (keyof typeof SHAPES)[];

const Shapes = {
  name: 'Shapes',
  render: () => (
    <Demonstrator
      rows={axis(SHAPE_KEYS)}
      cell={(key) => (
        <Box className="command-input-story">
          <CommandInput placeholder="/players" history={CONSOLE_HISTORY} onSubmit={() => undefined} {...SHAPES[key]} />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<CommandInputArgs>;

const Console = {
  name: 'In a console',
  render: () => <ConsoleDemo />,
} satisfies StoryLiteStoryDefinition<CommandInputArgs>;

const Off = {
  name: 'Off until a room hosts',
  render: () => <ConsoleDemo disabled />,
} satisfies StoryLiteStoryDefinition<CommandInputArgs>;

const CODE = `import { CommandInput } from '@drizztdourden08/tessera';

<CommandInput placeholder="/players" storageKey="console.history" onSubmit={send} />
<CommandInput history={sent} onSubmit={send} actions={<Button size="sm" onClick={save}>Save</Button>} />`;

const Overview = overviewStory({
  component: 'CommandInput',
  description: 'A command line: Enter sends, Up and Down walk the past commands, Escape clears.',
  points: [
    '[[Enter]] calls `onSubmit` with the trimmed text and empties the line; return false to keep it.',
    '[[Up]] and [[Down]] walk the history; Down past the newest brings back what was typed.',
    '[[Esc]] clears the line; on an empty line it passes on, so a dialog can close.',
    '`history` comes from the app, or the input keeps its own, kept under `storageKey`.',
    '`actions` sits under the input, such as quick commands, with the key hints at its end.',
  ],
  instead: 'A [TextInput] for text that is not a command, or a [SearchInput] to filter a list.',
  playground: Playground,
  variants: [Shapes, Console, Off],
  states: {
    render: (props: StateProps) => <CommandInput placeholder="/players" onSubmit={() => undefined} {...props} />,
    list: [STATE.idle, { ...STATE.hover, target: 'input' }, { ...STATE.focus, target: 'input' }, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { Console, Off, Overview, Playground, Shapes };
