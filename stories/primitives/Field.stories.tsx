/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Box, Field, Flex, NumberInput, Text, TextInput, Toggle, type ControlSize, type FieldWidth } from '../../src/primitives';
import { PasswordInput } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { SizesLineUp } from './_samples/SizesLineUp';
import './Field.stories.css';

type FieldArgs = {
  label: string;
  hint: string;
  error: string;
  required: boolean;
  inline: boolean;
  size: ControlSize;
  width: FieldWidth;
};

const ARGS: Partial<FieldArgs> = {
    label: 'Player name',
    hint: 'Shown to everyone in the session.',
    error: '',
    required: true,
    inline: false,
    size: 'md',
    width: 'md',
  };

const ARG_TYPES: PlaygroundArgTypes<FieldArgs> = {
    label: { group: 'Content', control: 'text' },
    hint: { group: 'Content', control: 'text' },
    inline: { group: 'Layout', control: 'boolean' },
    width: { group: 'Layout', control: 'select', options: ['sm', 'md', 'full'], description: 'The widest the field grows: 256 px, 512 px or the whole row.' },
    error: { group: 'State', control: 'text', description: 'Replaces the hint while set.' },
    required: { group: 'State', control: 'boolean' },
    size: { ...SIZE_ARG, description: 'Sets the size of the control inside, unless the control sets its own.' },
  };

const meta = {
  title: 'Primitives · Inputs/Field',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FieldArgs>;

const nameError = (name: string): string | undefined => {
  if (name.trim() === '') return 'A name is required.';
  if (name.length > 16) return 'Names are 16 characters at most.';
  return undefined;
};

const PlayerNameField = () => {
  const [name, setName] = useState('Link');
  return (
    <Box className="story-column">
      <Field label="Player name" hint="Shown to everyone in the session." error={nameError(name)} required htmlFor="field-player-name-live">
        <TextInput id="field-player-name-live" value={name} onChange={(event) => setName(event.target.value)} />
      </Field>
      <Text className="story-label">Value: {name === '' ? '(empty)' : name}</Text>
    </Box>
  );
};

const SessionForm = () => {
  const [seed, setSeed] = useState('48213');
  const [hintCost, setHintCost] = useState(25);
  const [spoilers, setSpoilers] = useState(false);
  const [roomPassword, setRoomPassword] = useState('abc');
  return (
    <Box className="story-column">
      <Field label="Seed" hint="Leave empty for a random seed." htmlFor="field-seed">
        <TextInput id="field-seed" value={seed} onChange={(event) => setSeed(event.target.value)} />
      </Field>
      <Field label="Hint cost" hint="Percent of your rupees." inline>
        <NumberInput value={hintCost} min={0} max={100} step={5} sizeToContent onChange={setHintCost} />
      </Field>
      <Field label="Room password" error="Passwords need at least 6 characters." required htmlFor="field-password">
        <PasswordInput id="field-password" value={roomPassword} onChange={setRoomPassword} />
      </Field>
      <Field>
        <Toggle checked={spoilers} onChange={setSpoilers} label="Publish the spoiler log" />
      </Field>
      <Text className="story-label">
        Seed {seed === '' ? 'random' : seed}, hint cost {hintCost}%, spoilers {spoilers ? 'on' : 'off'}
      </Text>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Field
      label={args.label}
      hint={args.hint || undefined}
      error={args.error || undefined}
      required={args.required}
      inline={args.inline}
      size={args.size}
      width={args.width}
      htmlFor="field-player-name"
    >
      <TextInput id="field-player-name" defaultValue="Link" />
    </Field>
  ),
} satisfies PlaygroundStory<FieldArgs>;

const Form = {
  name: 'In a form',
  render: () => <SessionForm />,
} satisfies StoryLiteStoryDefinition<FieldArgs>;

const Sizes = sizesStory<FieldArgs>((size) => (
  <Field label="Player name" hint="Shown to everyone in the session." size={size}>
    <TextInput defaultValue="Link" />
  </Field>
), { align: 'stretch' });

const Widths = {
  name: 'Widths on a wide page',
  render: () => (
    <Box className="story-column">
      <Field label="Server port" hint="width sm" width="sm">
        <TextInput defaultValue="38281" />
      </Field>
      <Field label="Server address" hint="width md, the default">
        <TextInput defaultValue="archipelago.gg" />
      </Field>
      <Field label="Session notes" hint="width full" width="full">
        <TextInput defaultValue="Async, one week, hints on" />
      </Field>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<FieldArgs>;

const NarrowRow = {
  name: 'Inline in a narrow row',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">A 192 px column: the control shrinks to fit beside its label</Text>
      <Box className="field-demo__narrow">
        <Field label="Server address" inline size="sm">
          <TextInput defaultValue="archipelago.gg" />
        </Field>
        <Field label="Players" inline size="sm">
          <Flex gap="xs">
            <NumberInput aria-label="Fewest players" value={2} min={1} max={16} onChange={() => undefined} />
            <NumberInput aria-label="Most players" value={8} min={1} max={16} onChange={() => undefined} />
          </Flex>
        </Field>
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<FieldArgs>;

const LineUp = {
  name: 'Sizes line up',
  render: () => <SizesLineUp />,
} satisfies StoryLiteStoryDefinition<FieldArgs>;

const Validation = {
  name: 'Live validation',
  render: () => <PlayerNameField />,
} satisfies StoryLiteStoryDefinition<FieldArgs>;

const renderState = (props: StateProps) => (
  <Field label="Player name" hint="Shown to everyone in the session." error={typeof props.error === 'string' ? props.error : undefined} required>
    <TextInput defaultValue={props.error === undefined ? 'Link' : ''} />
  </Field>
);

const Overview = overviewStory({
  component: 'Field',
  description: 'The frame around one form control, with a label above it and a hint or an error below it.',
  points: [
    'Put it around any input so every form lines up the same way.',
    '`error` replaces the hint and draws the control inside in its error look.',
    '`required` adds a star to the label, and `inline` puts the label beside the control.',
    '`htmlFor` ties the label to the input it names.',
    '`size` passes `md` or `sm` to the control inside, unless it sets its own.',
    '`width` caps the field on a wide page: `sm` 256 px, `md` 512 px by default, or `full`.',
  ],
  playground: Playground,
  variants: [Form, Widths, NarrowRow, Sizes, LineUp],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.error, props: { error: 'A name is required.' } },
    ],
  },
});

export default meta;
export { Form, LineUp, NarrowRow, Overview, Playground, Sizes, Validation, Widths };
