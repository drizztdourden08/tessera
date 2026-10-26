/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { InlineEditDemo } from './_samples/InlineEditDemo';
import { INLINE_EDIT_CODE } from './_samples/inline-edit.constants';
import type { InlineEditArgs } from './_samples/inline-edit.type';
import './InlineEdit.stories.css';

const ARGS: Partial<InlineEditArgs> = { initial: 'Fix the login redirect', placeholder: 'Add a title', multiline: false, disabled: false, validated: false };

const ARG_TYPES: PlaygroundArgTypes<InlineEditArgs> = {
  initial: { group: 'Content', control: 'text', description: 'The text before any edit.' },
  placeholder: { group: 'Content', control: 'text', description: 'Shown, muted, when the text is empty.' },
  multiline: { group: 'Behaviour', control: 'boolean', description: 'Edit in a text area; Enter adds a line and Mod+Enter commits.' },
  disabled: { group: 'State', control: 'boolean', description: 'Shows the text and does not let it be edited.' },
  validated: { group: 'Behaviour', control: 'boolean', description: 'Needs 3 to 40 characters; the message shows under the field.' },
};

const meta = {
  title: 'Composites · Forms/InlineEdit',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<InlineEditArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <InlineEditDemo key={`${args.multiline}-${args.disabled}`} {...args} />,
} satisfies PlaygroundStory<InlineEditArgs>;

const Line = {
  name: 'A title: click it, or press Enter or F2 on it',
  render: () => <InlineEditDemo initial="Fix the login redirect" label="Title" />,
} satisfies StoryLiteStoryDefinition<InlineEditArgs>;

const Empty = {
  name: 'Empty, with a placeholder',
  render: () => <InlineEditDemo initial="" placeholder="Add a title" />,
} satisfies StoryLiteStoryDefinition<InlineEditArgs>;

const Validated = {
  name: 'Validated: 3 to 40 characters, the message shows and the text is kept until it is valid',
  render: () => <InlineEditDemo initial="Fix" validated />,
} satisfies StoryLiteStoryDefinition<InlineEditArgs>;

const Multiline = {
  name: 'Several lines: Enter adds a line, Mod+Enter commits',
  render: () => <InlineEditDemo initial={'Check the redirect after login.\nThen check the logout.'} multiline label="Notes" />,
} satisfies StoryLiteStoryDefinition<InlineEditArgs>;

const Disabled = {
  name: 'Disabled',
  render: () => <InlineEditDemo initial="Fix the login redirect" disabled />,
} satisfies StoryLiteStoryDefinition<InlineEditArgs>;

const Overview = overviewStory({
  component: 'InlineEdit',
  description: 'Text that shows as text with a pen, and turns into a field when the user clicks it, or presses Enter or F2 on it.',
  points: [
    '`value` is the text and `onCommit(value)` takes the new one; the app keeps the state.',
    '[[Enter]] or leaving the field commits, and [[Escape]] cancels and restores the text.',
    '`validate(value)` returns a message to show under the field and keep the text from being committed.',
    '`multiline` edits in a text area, where Enter adds a line and Mod+Enter commits.',
    '`placeholder` stands in for an empty text, and `disabled` shows the text only.',
    'Focus goes back to the text after Enter or Escape; text that did not change is not committed.',
  ],
  instead: '[InlineCreateForm] to make a new thing from a name, or [TextInput] for a field that is always open.',
  playground: Playground,
  variants: [Line, Empty, Validated, Multiline, Disabled],
  code: INLINE_EDIT_CODE,
});

export default meta;
export { Disabled, Empty, Line, Multiline, Overview, Playground, Validated };
