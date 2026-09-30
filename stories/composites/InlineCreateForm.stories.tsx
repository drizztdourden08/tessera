/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { InlineCreateForm } from '../../src/composites';
import { Box, Field, Select, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type FormArgs = {
  placeholder: string;
  submitLabel: string;
  cancellable: boolean;
  error: string;
};

const GAMES = [
  { value: 'alttp', label: 'A Link to the Past' },
  { value: 'sm', label: 'Super Metroid' },
];

const FormDemo = (props: FormArgs) => {
  const { placeholder, submitLabel, cancellable, error } = props;
  const [created, setCreated] = useState('');
  return (
    <Box className="story-column">
      <InlineCreateForm
        placeholder={placeholder}
        submitLabel={submitLabel}
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

const ARGS: Partial<FormArgs> = { placeholder: 'Profile name', submitLabel: 'Create', cancellable: true, error: '' };

const ARG_TYPES: StoryLiteArgTypes<FormArgs> = {
  placeholder: { control: 'text' },
  submitLabel: { control: 'text' },
  cancellable: { control: 'boolean' },
  error: { control: 'text' },
};

const meta = {
  title: 'Composites · Dialogs/InlineCreateForm',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FormArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <FormDemo {...args} />,
} satisfies StoryLiteStoryDefinition<FormArgs>;

const ExtraFields = {
  name: 'Extra fields that gate submit',
  render: () => <ExtraFieldsDemo />,
} satisfies StoryLiteStoryDefinition<FormArgs>;

const renderState = (props: StateProps) => (
  <InlineCreateForm
    placeholder="Profile name"
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
/>`;

const Overview = overviewStory({
  component: 'InlineCreateForm',
  description: 'A small boxed form that creates one thing from a name, in place on the page. Reach for it where a dialog would be too much, such as a new profile above the profile list. The name field takes focus and Enter submits; Create stays disabled until there is a name and canSubmit holds. extraFields sit under the name, error shows under them in the danger colour and marks the field, and onCancel adds a Cancel button.',
  playground: Playground,
  variants: [ExtraFields],
  states: {
    render: renderState,
    list: [
      { ...STATE.idle, name: 'Empty' },
      { name: 'Filled', props: { value: 'Mira' } },
      { name: 'Error', props: { value: 'Mira', error: 'A profile named Mira already exists.' } },
    ],
  },
  code: CODE,
});

export default meta;
export { ExtraFields, Overview, Playground };
