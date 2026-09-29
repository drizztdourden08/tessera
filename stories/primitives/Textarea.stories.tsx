/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Field, Textarea } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { useTextField } from '../_template/use-text-field';
import type { StatefulTextProps } from '../_template/use-text-field';

type TextareaArgs = {
  initialValue: string;
  placeholder: string;
  rows: number;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
};

const SESSION_NOTES = 'Picked up the lamp early.\nSkipped the sewer route and went straight to the throne room.';

const ARGS: Partial<TextareaArgs> = { initialValue: SESSION_NOTES, placeholder: 'Notes for this session', rows: 4, disabled: false, readOnly: false, invalid: false };

const ARG_TYPES: StoryLiteArgTypes<TextareaArgs> = {
    initialValue: { control: 'textarea' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean', description: 'Draws the error look. A Field with an error sets it on its own.' },
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
      invalid={args.invalid}
    />
  ),
} satisfies StoryLiteStoryDefinition<TextareaArgs>;

const InField = {
  name: 'In a field',
  render: () => (
    <Field label="Session notes" hint="Only you can read these.">
      <StatefulTextarea initial={SESSION_NOTES} />
    </Field>
  ),
} satisfies StoryLiteStoryDefinition<TextareaArgs>;

const renderState = (props: StateProps) => <Textarea rows={3} placeholder="Notes for this session" {...props} />;

const renderError = (props: StateProps) => (
  <Field error="Keep the description under 280 characters.">
    <Textarea rows={3} defaultValue="Keysanity, open mode, swordless, with the shop prices shuffled." {...props} />
  </Field>
);

const Overview = overviewStory({
  component: 'Textarea',
  description: 'A multi-line text field, the styled replacement for a raw textarea. Use it for notes, descriptions and any text longer than one line. It takes every native textarea attribute, including rows, placeholder, disabled and readOnly, and forwards its ref. Set invalid for the error look, or wrap it in a Field with an error: the field sets invalid for it and shows the message.',
  playground: Playground,
  variants: [InField],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      STATE.focus,
      { name: 'Filled', props: { defaultValue: SESSION_NOTES } },
      { ...STATE.readOnly, props: { readOnly: true, defaultValue: 'Recorded by the tracker at the end of the run.' } },
      { ...STATE.error, render: renderError },
      { ...STATE.disabled, props: { disabled: true, defaultValue: 'Notes are locked while a race is running.' } },
    ],
  },
});

export default meta;
export { InField, Overview, Playground };
