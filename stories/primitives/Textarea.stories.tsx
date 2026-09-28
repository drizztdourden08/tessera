/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Field, Text, Textarea } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { useTextField } from '../_template/use-text-field';
import type { StatefulTextProps } from '../_template/use-text-field';

type TextareaArgs = {
  initialValue: string;
  placeholder: string;
  rows: number;
  disabled: boolean;
  readOnly: boolean;
};

const SESSION_NOTES = 'Picked up the lamp early.\nSkipped the sewer route and went straight to the throne room.';

const ARGS: Partial<TextareaArgs> = { initialValue: SESSION_NOTES, placeholder: 'Notes for this session', rows: 4, disabled: false, readOnly: false };

const ARG_TYPES: StoryLiteArgTypes<TextareaArgs> = {
    initialValue: { control: 'textarea' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/Textarea',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TextareaArgs>;

const StatefulTextarea = (props: StatefulTextProps) => {
  const field = useTextField(props);
  return <Textarea rows={3} {...field} />;
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Textarea
      key={args.initialValue}
      defaultValue={args.initialValue}
      placeholder={args.placeholder}
      rows={args.rows}
      disabled={args.disabled}
      readOnly={args.readOnly}
    />
  ),
} satisfies StoryLiteStoryDefinition<TextareaArgs>;

const States = {
  name: 'States',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">empty, placeholder only</Text>
      <StatefulTextarea initial="" placeholder="Notes for this session" />
      <Text className="story-label">filled</Text>
      <StatefulTextarea initial={SESSION_NOTES} />
      <Text className="story-label">read only</Text>
      <StatefulTextarea initial="Recorded by the tracker at the end of the run." readOnly />
      <Text className="story-label">disabled</Text>
      <StatefulTextarea initial="Notes are locked while a race is running." disabled />
      <Text className="story-label">error, shown by the surrounding field</Text>
      <Field label="Seed description" error="Keep the description under 280 characters.">
        <StatefulTextarea initial="Keysanity, open mode, swordless, with the shop prices shuffled." />
      </Field>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TextareaArgs>;

const Overview = overviewStory({
  component: 'Textarea',
  description: 'A multi-line text field, the styled replacement for a raw textarea. Use it for notes, descriptions and any text longer than one line. It takes every native textarea attribute, including rows, placeholder, disabled and readOnly, and forwards its ref. It shows no error of its own: wrap it in a Field to give it a label and an error message.',
  playground: Playground,
  variants: [States],
});

export default meta;
export { Overview, Playground, States };
