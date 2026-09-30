/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { InlineCreateForm, ProfilePicker } from '../../src/composites';
import type { ProfilePickerItem } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type PickerArgs = {
  title: string;
  deletable: boolean;
  newLabel: string;
};

const PROFILES: readonly ProfilePickerItem[] = [
  { id: 'mira', name: 'Mira', meta: 'A Link to the Past, randomizer', aside: '2 hours ago' },
  { id: 'tomas', name: 'Tomas', meta: 'Super Metroid', aside: '3 days ago' },
  { id: 'league', name: 'League practice', aside: 'Last month' },
];

const PickerDemo = (props: PickerArgs) => {
  const { title, deletable, newLabel } = props;
  const [profiles, setProfiles] = useState(PROFILES);
  const [selected, setSelected] = useState<string | null>('mira');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = (name: string) => {
    if (profiles.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setError(`A profile named ${name} already exists.`);
      return;
    }
    const id = name.toLowerCase().replaceAll(' ', '-');
    setProfiles([...profiles, { id, name, aside: 'Just now' }]);
    setSelected(id);
    setCreating(false);
    setError(null);
  };
  const showForm = creating || profiles.length === 0;
  const cancel = profiles.length > 0 ? () => { setCreating(false); setError(null); } : undefined;

  return (
    <Box className="story-column">
      <ProfilePicker
        title={profiles.length === 0 ? 'Create a profile to get started' : title}
        profiles={profiles}
        selectedId={selected}
        onSelect={setSelected}
        onDelete={deletable ? (id) => setProfiles(profiles.filter((p) => p.id !== id)) : undefined}
        create={showForm ? <InlineCreateForm placeholder="Profile name" onCreate={create} onCancel={cancel} error={error} /> : undefined}
        onNew={() => setCreating(true)}
        newLabel={newLabel}
      />
    </Box>
  );
};

const ARGS: Partial<PickerArgs> = { title: 'Pick a profile, or create another', deletable: true, newLabel: 'New profile' };

const ARG_TYPES: StoryLiteArgTypes<PickerArgs> = {
  title: { control: 'text' },
  deletable: { control: 'boolean' },
  newLabel: { control: 'text' },
};

const meta = {
  title: 'Composites · Navigation/ProfilePicker',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PickerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PickerDemo {...args} />,
} satisfies StoryLiteStoryDefinition<PickerArgs>;

const Creating = {
  name: 'Creating, with an error',
  render: () => (
    <ProfilePicker
      title="Pick a profile, or create another"
      profiles={PROFILES.slice(0, 2)}
      onSelect={() => undefined}
      create={<InlineCreateForm placeholder="Profile name" defaultValue="Mira" onCreate={() => undefined} onCancel={() => undefined} error="A profile named Mira already exists." />}
    />
  ),
} satisfies StoryLiteStoryDefinition<PickerArgs>;

const renderState = (props: StateProps) => (
  <ProfilePicker
    title="Pick a profile"
    profiles={PROFILES.slice(0, 1)}
    selectedId={props.selected === true ? 'mira' : null}
    onSelect={() => undefined}
    onDelete={() => undefined}
  />
);

const CODE = `import { InlineCreateForm, ProfilePicker } from '@drizztdourden08/tessera';

<ProfilePicker
  title="Pick a profile, or create another"
  profiles={profiles.map((p) => ({ id: p.id, name: p.name, meta: p.game, aside: ago(p.lastPlayed) }))}
  selectedId={active?.id}
  onSelect={select}
  onDelete={remove}
  create={creating ? <InlineCreateForm placeholder="Profile name" onCreate={create} onCancel={stopCreating} error={error} /> : undefined}
  onNew={startCreating}
/>`;

const Overview = overviewStory({
  component: 'ProfilePicker',
  description: 'The profile screen: a header, an optional create form, and the profiles as ListItemRows with a line of meta and a date on the right. Reach for it wherever the user picks, adds or removes a profile or a similar saved setup. onNew shows a New profile button in the header while no create form shows, and create takes an InlineCreateForm, drawn above the list. onDelete adds a ConfirmIconButton to each row, which asks once before it deletes.',
  playground: Playground,
  variants: [Creating],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.list-item-row' },
      STATE.selected,
    ],
  },
  code: CODE,
});

export default meta;
export { Creating, Overview, Playground };
