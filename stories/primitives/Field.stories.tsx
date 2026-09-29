/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Field, NumberInput, Text, TextInput, Toggle } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type FieldArgs = {
  label: string;
  hint: string;
  error: string;
  required: boolean;
  inline: boolean;
};

const ARGS: Partial<FieldArgs> = {
    label: 'Player name',
    hint: 'Shown to everyone in the session.',
    error: '',
    required: true,
    inline: false,
  };

const ARG_TYPES: StoryLiteArgTypes<FieldArgs> = {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text', description: 'Replaces the hint while set.' },
    required: { control: 'boolean' },
    inline: { control: 'boolean' },
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
  return (
    <Box className="story-column">
      <Field label="Seed" hint="Leave empty for a random seed." htmlFor="field-seed">
        <TextInput id="field-seed" value={seed} onChange={(event) => setSeed(event.target.value)} />
      </Field>
      <Field label="Hint cost" hint="Percent of your rupees." inline>
        <NumberInput value={hintCost} min={0} max={100} step={5} sizeToContent onChange={setHintCost} />
      </Field>
      <Field label="Room password" error="Passwords need at least 6 characters." required htmlFor="field-password">
        <TextInput id="field-password" type="password" defaultValue="abc" />
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
      htmlFor="field-player-name"
    >
      <TextInput id="field-player-name" defaultValue="Link" />
    </Field>
  ),
} satisfies StoryLiteStoryDefinition<FieldArgs>;

const Form = {
  name: 'In a form',
  render: () => <SessionForm />,
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
  description: 'The frame around one form control: a label above it, and a hint or an error below it. Reach for it around any input so every form lines up the same way. An error replaces the hint while it is set and marks the control inside as invalid, which draws its error look. Required adds a star to the label, inline puts the label beside the control, and htmlFor ties the label to the input it names.',
  playground: Playground,
  variants: [Form],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.error, props: { error: 'A name is required.' } },
    ],
  },
});

export default meta;
export { Form, Overview, Playground, Validation };
