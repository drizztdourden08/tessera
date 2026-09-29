/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Field, Text, TextInput } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type InputType = 'text' | 'password' | 'email' | 'search';

type TextInputArgs = {
  initialValue: string;
  placeholder: string;
  type: InputType;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
};

const ARGS: Partial<TextInputArgs> = { initialValue: 'Link', placeholder: 'Player name', type: 'text', disabled: false, readOnly: false, invalid: false };

const ARG_TYPES: StoryLiteArgTypes<TextInputArgs> = {
    initialValue: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'password', 'email', 'search'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean', description: 'Draws the error look. A Field with an error sets it on its own.' },
  };

const TYPES: readonly { type: InputType; value: string }[] = [
  { type: 'text', value: 'Link' },
  { type: 'password', value: 'triforce' },
  { type: 'email', value: 'link@hyrule.example' },
  { type: 'search', value: 'Master Sword' },
];

const meta = {
  title: 'Primitives · Inputs/TextInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TextInputArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <TextInput
      key={args.initialValue}
      defaultValue={args.initialValue}
      placeholder={args.placeholder}
      type={args.type}
      disabled={args.disabled}
      readOnly={args.readOnly}
      invalid={args.invalid}
    />
  ),
} satisfies StoryLiteStoryDefinition<TextInputArgs>;

const Types = {
  name: 'Types',
  render: () => (
    <Box className="story-list">
      {TYPES.map(({ type, value }) => (
        <Box key={type} className="story-list__item">
          <Text className="story-label">{type}</Text>
          <TextInput type={type} defaultValue={value} />
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TextInputArgs>;

const InField = {
  name: 'In a field',
  render: () => (
    <Field label="Player name" hint="Shown to everyone in the session.">
      <TextInput defaultValue="Link" />
    </Field>
  ),
} satisfies StoryLiteStoryDefinition<TextInputArgs>;

const renderState = (props: StateProps) => <TextInput placeholder="Player name" {...props} />;

const renderError = (props: StateProps) => (
  <Field error="A name needs at least one letter.">
    <TextInput defaultValue="1234" {...props} />
  </Field>
);

const Overview = overviewStory({
  component: 'TextInput',
  description: 'A single-line text field, the styled replacement for a raw input. Use it for names, addresses, search terms and passwords. It takes every native input attribute, including type, placeholder, disabled and readOnly, and forwards its ref. Set invalid for the error look, or wrap it in a Field with an error: the field sets invalid for it and shows the message.',
  playground: Playground,
  variants: [Types, InField],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      STATE.focus,
      { name: 'Filled', props: { defaultValue: 'Zelda' } },
      { ...STATE.readOnly, props: { readOnly: true, defaultValue: 'Seed 48213' } },
      { ...STATE.error, render: renderError },
      { ...STATE.disabled, props: { disabled: true, defaultValue: 'Hyrule Castle' } },
    ],
  },
});

export default meta;
export { InField, Overview, Playground, Types };
