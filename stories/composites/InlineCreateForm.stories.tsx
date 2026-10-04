/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { InlineCreateForm } from '../../src/composites';
import { Box, Field, Select, Text } from '../../src/primitives';
import type { ControlSize } from '../../src/primitives';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { overviewStory } from '../_template/overview-story';
import { sizesStory } from '../_template/sizes-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { FolderListDemo } from './_samples/FolderListDemo';
import './InlineCreateForm.stories.css';

type FormArgs = {
  placeholder: string;
  submitLabel: string;
  cancellable: boolean;
  compact: boolean;
  size: ControlSize;
  error: string;
};

const GAMES = [
  { value: 'alttp', label: 'A Link to the Past' },
  { value: 'sm', label: 'Super Metroid' },
];

const FormDemo = (props: FormArgs) => {
  const { placeholder, submitLabel, cancellable, compact, size, error } = props;
  const [created, setCreated] = useState('');
  return (
    <Box className="story-column">
      <InlineCreateForm
        placeholder={placeholder}
        submitLabel={submitLabel}
        compact={compact}
        size={size}
        onCreate={setCreated}
        onCancel={cancellable ? () => setCreated('') : undefined}
        error={error || undefined}
      />
      <Text className="story-label">{created ? `Created ${created}` : 'Type a name, then press Enter or Create'}</Text>
    </Box>
  );
};

const ExtraFieldsDemo = () => {
  const [game, setGame] = useState('');
  return (
    <InlineCreateForm
      placeholder="Profile name"
      canSubmit={game !== ''}
      onCreate={() => undefined}
      extraFields={<Field label="Game"><Select value={game} onChange={setGame} options={GAMES} placeholder="Pick a game" /></Field>}
    />
  );
};

const ARGS: Partial<FormArgs> = { placeholder: 'Profile name', submitLabel: 'Create', cancellable: true, compact: false, size: 'md', error: '' };

const ARG_TYPES: PlaygroundArgTypes<FormArgs> = {
  placeholder: { group: 'Content', control: 'text' },
  submitLabel: { group: 'Content', control: 'text' },
  compact: { group: 'Appearance', control: 'boolean', description: 'One line, unboxed: the fields, then icon buttons to create and cancel.' },
  cancellable: { group: 'Behaviour', control: 'boolean' },
  size: SIZE_ARG,
  error: { group: 'State', control: 'text' },
};

const meta = {
  title: 'Composites · Forms/InlineCreateForm',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FormArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <FormDemo {...args} />,
} satisfies PlaygroundStory<FormArgs>;

const ExtraFields = {
  name: 'Extra fields that gate submit',
  render: () => <ExtraFieldsDemo />,
} satisfies StoryLiteStoryDefinition<FormArgs>;

const Compact = {
  name: 'Compact, at the foot of a list',
  render: () => <FolderListDemo size="md" />,
} satisfies StoryLiteStoryDefinition<FormArgs>;

const Sizes = sizesStory<FormArgs>((size) => <FolderListDemo size={size} />);

const renderState = (props: StateProps) => (
  <InlineCreateForm
    placeholder="Profile name"
    compact={props.compact === true}
    defaultValue={typeof props.value === 'string' ? props.value : ''}
    onCreate={() => undefined}
    onCancel={() => undefined}
    error={typeof props.error === 'string' ? props.error : undefined}
  />
);

const CODE = `import { InlineCreateForm } from '@drizztdourden08/tessera';

<InlineCreateForm
  placeholder="Profile name"
  onCreate={create}
  onCancel={stopCreating}
  error={error}
/>

<InlineCreateForm
  compact
  size="sm"
  label="New folder name"
  placeholder="New folder"
  submitLabel="Create folder"
  onCreate={create}
  error={error}
/>`;

const Overview = overviewStory({
  component: 'InlineCreateForm',
  description: 'A small boxed form that creates one thing from a name, in place on the page. Reach for it where a dialog would be too much, such as a new profile above the profile list. The name field takes focus and Enter submits; Create stays disabled until there is a name and canSubmit holds. extraFields sit under the name, error shows under them in the danger colour and marks the field, and onCancel adds a Cancel button. compact draws it on one line, unboxed: the name, any extraFields, then an icon button that creates and one that cancels, each named by submitLabel and cancelLabel. size takes md or sm like any control, and without it the form follows the size of the Field around it, else md; the name, the extraFields and the buttons all follow it. The name keeps its accessible name from label or the placeholder, and an error shows on a line below and describes the field.',
  playground: Playground,
  variants: [Compact, Sizes, ExtraFields],
  states: {
    render: renderState,
    list: [
      { ...STATE.idle, name: 'Empty' },
      { name: 'Filled', props: { value: 'Mira' } },
      { name: 'Error', props: { value: 'Mira', error: 'A profile named Mira already exists.' } },
      { name: 'Compact', props: { compact: true, value: 'Mira' } },
      { name: 'Compact error', props: { compact: true, value: 'Mira', error: 'A profile named Mira already exists.' } },
    ],
  },
  code: CODE,
});

export default meta;
export { Compact, ExtraFields, Overview, Playground, Sizes };
