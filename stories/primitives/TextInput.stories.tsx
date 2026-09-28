/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Field, Text, TextInput } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { useTextField } from '../_template/use-text-field';
import type { StatefulTextProps } from '../_template/use-text-field';

type InputType = 'text' | 'password' | 'email' | 'search';

type TextInputArgs = {
  initialValue: string;
  placeholder: string;
  type: InputType;
  disabled: boolean;
  readOnly: boolean;
};

const ARGS: Partial<TextInputArgs> = { initialValue: 'Link', placeholder: 'Player name', type: 'text', disabled: false, readOnly: false };

const ARG_TYPES: StoryLiteArgTypes<TextInputArgs> = {
    initialValue: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'password', 'email', 'search'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/TextInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TextInputArgs>;

const StatefulInput = (props: StatefulTextProps) => {
  const field = useTextField(props);
  return <TextInput {...field} />;
};

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
    />
  ),
} satisfies StoryLiteStoryDefinition<TextInputArgs>;

const States = {
  name: 'States',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">empty, placeholder only</Text>
      <StatefulInput initial="" placeholder="Player name" />
      <Text className="story-label">filled</Text>
      <StatefulInput initial="Zelda" />
      <Text className="story-label">read only</Text>
      <StatefulInput initial="Seed 48213" readOnly />
      <Text className="story-label">disabled</Text>
      <StatefulInput initial="Hyrule Castle" disabled />
      <Text className="story-label">error, shown by the surrounding field</Text>
      <Field label="Player name" error="A name needs at least one letter.">
        <StatefulInput initial="1234" />
      </Field>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TextInputArgs>;

const Overview = overviewStory({
  component: 'TextInput',
  description: 'A single-line text field, the styled replacement for a raw input. Use it for names, addresses, search terms and passwords. It takes every native input attribute, including type, placeholder, disabled and readOnly, and forwards its ref. It shows no error of its own: wrap it in a Field to give it a label and an error message.',
  playground: Playground,
  variants: [States],
});

export default meta;
export { Overview, Playground, States };
