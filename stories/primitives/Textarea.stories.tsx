/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Field, Textarea, type ControlSize, type TextareaResize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
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
  resize: TextareaResize;
  size: ControlSize;
};

const RESIZES: readonly TextareaResize[] = ['vertical', 'none', 'horizontal', 'both'];

const SESSION_NOTES = 'Picked up the lamp early.\nSkipped the sewer route and went straight to the throne room.';

const ARGS: Partial<TextareaArgs> = { initialValue: SESSION_NOTES, placeholder: 'Notes for this session', rows: 4, disabled: false, readOnly: false, invalid: false, resize: 'vertical', size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<TextareaArgs> = {
    initialValue: { group: 'Content', control: 'textarea' },
    placeholder: { group: 'Content', control: 'text' },
    rows: { group: 'Layout', control: 'number' },
    resize: { group: 'Layout', control: 'select', options: [...RESIZES], description: 'Which way the corner handle drags. none locks the size.' },
    disabled: { group: 'State', control: 'boolean' },
    readOnly: { group: 'State', control: 'boolean' },
    invalid: { group: 'State', control: 'boolean', description: 'Draws the error look. A Field with an error sets it on its own.' },
    size: SIZE_ARG,
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
      resize={args.resize}
      size={args.size}
    />
  ),
} satisfies PlaygroundStory<TextareaArgs>;

const Sizes = sizesStory<TextareaArgs>((size) => <Textarea size={size} rows={1} defaultValue="One line of notes" />, { align: 'stretch' });

const Resize = {
  name: 'Resize',
  render: () => (
    <Demonstrator
      rows={axis(RESIZES)}
      align="stretch"
      cell={(resize) => <Textarea resize={resize} rows={2} defaultValue={resize === 'none' ? 'Locked at two rows.' : `Drag the corner: ${resize}.`} />}
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
  description: 'A multi-line text field, for notes, descriptions and any text longer than one line.',
  points: [
    'It takes every native textarea attribute, including `rows`, and forwards its ref.',
    '`resize` sets which way the corner handle drags: `vertical` by default, or `none` to lock the size.',
    '`invalid`, or a [Field] with an error, draws the error look.',
    'At one row, `md` and `sm` match the standard and compact control heights.',
  ],
  instead: '[TextInput] for one line.',
  playground: Playground,
  variants: [Sizes, Resize, InField],
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
export { InField, Overview, Playground, Resize, Sizes };
