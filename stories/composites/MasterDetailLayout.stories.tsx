/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ListItemRow, MasterDetailLayout } from '../../src/composites';
import { Box, EmptyState, Icon, StatRow, Status, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { NAV_ICONS } from './_samples/nav';
import { SESSIONS, STATUS_LABEL } from './_samples/sessions';
import type { SampleSession } from './_samples/sessions';
import './MasterDetailLayout.stories.css';

type MasterDetailArgs = {
  startSelected: boolean;
  emptyMessage: string;
  resizable: boolean;
  narrow: boolean;
};

const SessionDetail = ({ session }: { session: SampleSession }) => (
  <Box className="story-column">
    <Box className="story-row">
      <Text variant="title">{session.name}</Text>
      <Status tone={session.status === 'running' ? 'success' : 'neutral'}>{STATUS_LABEL[session.status]}</Status>
    </Box>
    <StatRow label="Session id" value={session.id} mono />
    <StatRow label="Host" value={session.host} />
    <StatRow label="Server" value={session.server} mono />
    <StatRow label="Preset" value={session.preset} />
    <StatRow label="Players" value={session.players} />
    <StatRow label="Started" value={session.started} />
  </Box>
);

const LayoutDemo = (props: Pick<MasterDetailArgs, 'startSelected' | 'emptyMessage'> & Partial<MasterDetailArgs>) => {
  const { startSelected, emptyMessage, resizable = true, narrow = false } = props;
  const [selectedId, setSelectedId] = useState<string | null>(startSelected ? SESSIONS[0].id : null);
  const selected = SESSIONS.find((s) => s.id === selectedId);
  const list = SESSIONS.map((s) => (
    <ListItemRow
      key={s.id}
      icon={<Icon name={NAV_ICONS.sessions} />}
      name={s.name}
      meta={`${s.players} players, ${s.server}`}
      selected={s.id === selectedId}
      onClick={() => setSelectedId(s.id === selectedId ? null : s.id)}
    />
  ));
  return (
    <Box className={`story-frame master-detail-story__frame${narrow ? ' master-detail-story__frame--narrow' : ''}`}>
      <MasterDetailLayout
        list={list}
        detail={selected ? <SessionDetail session={selected} /> : <EmptyState message={emptyMessage} />}
        detailEmpty={!selected}
        onBack={() => setSelectedId(null)}
        resizable={resizable}
        storageKey="tessera-stories:master-detail-width"
        listLabel="sessions"
        detailLabel="session details"
      />
    </Box>
  );
};

const ARGS: Partial<MasterDetailArgs> = { startSelected: true, emptyMessage: 'Pick a session to see its details.', resizable: true, narrow: false };

const ARG_TYPES: PlaygroundArgTypes<MasterDetailArgs> = {
    emptyMessage: { group: 'Content', control: 'text' },
    startSelected: { group: 'State', control: 'boolean' },
    resizable: { group: 'Behaviour', control: 'boolean', description: 'A divider between the columns drags the list width, from 240 to 480 px.' },
    narrow: { group: 'Layout', control: 'boolean', description: 'A 512 px frame: under 768 px the list and the detail stack, with Back in the detail.' },
  };

const meta = {
  title: 'Composites · Layout/MasterDetailLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MasterDetailArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayoutDemo key={String(args.startSelected)} {...args} />,
} satisfies PlaygroundStory<MasterDetailArgs>;

const Resizable = {
  name: 'A wide window: drag the divider',
  render: () => <LayoutDemo startSelected emptyMessage="Pick a session to see its details." />,
} satisfies StoryLiteStoryDefinition<MasterDetailArgs>;

const Stacked = {
  name: 'A small window: the list, then the detail with Back',
  render: () => <LayoutDemo startSelected={false} narrow emptyMessage="Pick a session to see its details." />,
} satisfies StoryLiteStoryDefinition<MasterDetailArgs>;

const renderState = (props: StateProps) => (
  <LayoutDemo startSelected={props.empty !== true} emptyMessage="Pick a session to see its details." />
);

const CODE = `import { EmptyState, ListItemRow, MasterDetailLayout } from '@drizztdourden08/tessera';

const [selectedId, setSelectedId] = useState<string | null>(null);
const selected = sessions.find((s) => s.id === selectedId);

<MasterDetailLayout
  list={sessions.map((s) => (
    <ListItemRow key={s.id} name={s.name} selected={s.id === selectedId} onClick={() => setSelectedId(s.id)} />
  ))}
  detail={selected ? <SessionDetail session={selected} /> : <EmptyState message="Pick a session." />}
  detailEmpty={!selected}
  onBack={() => setSelectedId(null)}
  storageKey="sessions.list-width"
/>`;

const Overview = overviewStory({
  component: 'MasterDetailLayout',
  description: 'A scrolling list on the left and the detail of the picked item on the right.',
  points: [
    'Pass the `list` and the `detail` as content; the list scrolls on its own.',
    'The list is 320 px wide; drag the divider between 240 and 480 px, kept under `storageKey`.',
    'Under 768 px the columns stack: the list, then the detail with a Back button that calls `onBack`.',
    '`detailEmpty` centres the detail panel for a placeholder, and on a small window shows the list.',
    '**It is layout only:** the caller fills both columns and owns the selection, so `onBack` clears it.',
  ],
  instead: '[SplitPane] for two panes of equal weight that split by share.',
  playground: Playground,
  variants: [Resizable, Stacked],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { name: 'Nothing selected', props: { empty: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Overview, Playground, Resizable, Stacked };
