/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Field, TextInput, type ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
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
  size: ControlSize;
};

const ARGS: Partial<TextInputArgs> = { initialValue: 'Link', placeholder: 'Player name', type: 'text', disabled: false, readOnly: false, invalid: false, size: 'md' };

const ARG_TYPES: StoryLiteArgTypes<TextInputArgs> = {
    initialValue: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'password', 'email', 'search'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean', description: 'Draws the error look. A Field with an error sets it on its own.' },
    size: SIZE_ARG,
  };

const TYPES: readonly InputType[] = ['text', 'password', 'email', 'search'];

const TYPE_VALUES: Record<InputType, string> = {
  text: 'Link',
  password: 'triforce',
  email: 'link@hyrule.example',
  search: 'Master Sword',
};

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
      size={args.size}
    />
  ),
} satisfies StoryLiteStoryDefinition<TextInputArgs>;

const Types = {
  name: 'Types',
  render: () => (
    <Demonstrator rows={axis(TYPES)} align="stretch" cell={(type) => <TextInput type={type} defaultValue={TYPE_VALUES[type]} />} />
  ),
} satisfies StoryLiteStoryDefinition<TextInputArgs>;

const Sizes = sizesStory<TextInputArgs>((size) => <TextInput size={size} defaultValue="Link" />, { align: 'stretch' });

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
  description: 'A single-line text field, the styled replacement for a raw input. Use it for names, addresses, search terms and passwords. size md is the standard control height and sm the compact one. It takes every native input attribute, including type, placeholder, disabled and readOnly, and forwards its ref. Set invalid for the error look, or wrap it in a Field with an error: the field sets invalid for it and shows the message.',
  playground: Playground,
  variants: [Types, Sizes, InField],
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
export { InField, Overview, Playground, Sizes, Types };
