/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button } from '../../src/primitives';
import { CommandInput } from '../../src/composites';
import type { ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { CONSOLE_COMMANDS, CONSOLE_HISTORY } from './_samples/console-samples.constants';
import { ConsoleDemo } from './_samples/ConsoleDemo';
import './CommandInput.stories.css';

type CommandInputArgs = {
  placeholder: string;
  sendLabel: string;
  keyHints: boolean;
  quick: boolean;
  suggest: boolean;
  disabled: boolean;
  size: ControlSize;
};

const ARGS: Partial<CommandInputArgs> = { placeholder: '/hint Bram Moon Pearl', sendLabel: '', keyHints: true, quick: true, suggest: true, disabled: false, size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<CommandInputArgs> = {
  placeholder: { group: 'Content', control: 'text' },
  sendLabel: { group: 'Content', control: 'text', description: 'Replaces Send on the button.' },
  keyHints: { group: 'Appearance', control: 'boolean', description: 'The Up, Down and Esc keys at the end of the row under the input.' },
  quick: { group: 'Content', control: 'boolean', description: 'Two quick command buttons in actions.' },
  suggest: { group: 'Content', control: 'boolean', description: 'Passes the known commands, so typing lists the closest ones.' },
  disabled: { group: 'State', control: 'boolean' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'] },
};

const meta = {
  title: 'Composites · Inputs/CommandInput',
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
  render: ({ quick, suggest, sendLabel, ...args }) => (
    <Box className="command-input-story">
      <CommandInput {...args} commands={suggest ? CONSOLE_COMMANDS : undefined} sendLabel={sendLabel === '' ? undefined : sendLabel} storageKey="tessera-gallery.command-input" actions={quick ? QUICK : undefined} onSubmit={() => undefined} />
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

const Suggestions = {
  name: 'Closest commands while typing',
  render: () => (
    <Box className="command-input-story">
      <CommandInput placeholder="Type /s or /re" history={CONSOLE_HISTORY} commands={CONSOLE_COMMANDS} onSubmit={() => undefined} />
    </Box>
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

<CommandInput placeholder="/players" storageKey="console.history" commands={['/players', '/hint', '/save']} onSubmit={send} />
<CommandInput history={sent} onSubmit={send} actions={<Button size="sm" onClick={save}>Save</Button>} />`;

const Overview = overviewStory({
  component: 'CommandInput',
  description: 'A command line: Enter sends, Tab completes a known command, Up and Down walk the past commands, Escape clears.',
  points: [
    '[[Enter]] calls `onSubmit` with the trimmed text and empties the line; return false to keep it.',
    'The line is a free text [Combobox]: `commands` lists the closest ones under it as you type.',
    '[[Tab]] or [[Right]] completes the active row or the top one; [[Enter]] takes a row picked with the arrows.',
    '[[Up]] and [[Down]] move through that list while it is open, else walk the history, back to what was typed.',
    '[[Esc]] closes the list, then clears the line; on an empty line it passes on, so a dialog can close.',
    '`history` comes from the app or is kept under `storageKey`; `actions` and the key hints sit under the line.',
  ],
  instead: 'A [TextInput] for text that is not a command, or a [SearchInput] to filter a list.',
  playground: Playground,
  variants: [Suggestions, Shapes, Console, Off],
  states: {
    render: (props: StateProps) => <CommandInput placeholder="/players" onSubmit={() => undefined} {...props} />,
    list: [STATE.idle, { ...STATE.hover, target: 'input' }, { ...STATE.focus, target: 'input' }, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { Console, Off, Overview, Playground, Shapes, Suggestions };
