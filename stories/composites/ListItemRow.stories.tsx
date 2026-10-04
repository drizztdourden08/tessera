/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ListItemList, ListItemRow } from '../../src/composites';
import type { ListItemColumn } from '../../src/composites';
import { Box, Button, Icon, Status, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { NAV_ICONS } from './_samples/nav';
import { SESSIONS, STATUS_LABEL } from './_samples/sessions';
import type { SampleSession } from './_samples/sessions';
import './ListItemRow.stories.css';

type RowArgs = {
  name: string;
  meta: string;
  columns: number;
  twoLines: boolean;
  withIcon: boolean;
  selected: boolean;
  withAction: boolean;
};

const sessionIcon = <Icon name={NAV_ICONS.sessions} />;

const sessionColumns = (session: SampleSession, count: number, twoLines: boolean): ListItemColumn[] => [
  { primary: `${session.players} players`, secondary: twoLines ? session.preset : undefined, align: 'end' as const },
  { primary: session.server, secondary: twoLines ? `host ${session.host}` : undefined },
  { primary: session.started, secondary: twoLines ? STATUS_LABEL[session.status] : undefined, align: 'end' as const },
].slice(0, count);

const SessionList = ({ selectable }: { selectable: boolean }) => {
  const [selectedId, setSelectedId] = useState(SESSIONS[0].id);
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <Box className="story-column list-item-row-story">
      <ListItemList label="Sessions">
        {SESSIONS.map((s) => (
          <ListItemRow
            key={s.id}
            icon={sessionIcon}
            name={s.name}
            meta={<Status tone={s.status === 'running' ? 'success' : 'neutral'}>{STATUS_LABEL[s.status]}</Status>}
            columns={sessionColumns(s, 3, true)}
            selected={selectable && s.id === selectedId}
            onClick={selectable ? () => setSelectedId(s.id) : undefined}
            onDoubleClick={selectable ? () => setOpened(s.name) : undefined}
            action={<Button size="sm" variant="secondary">Join</Button>}
          />
        ))}
      </ListItemList>
      {selectable && <Text className="story-label">{opened ? `Opened ${opened}` : 'Click to select, double-click to open'}</Text>}
    </Box>
  );
};

const ARGS: Partial<RowArgs> = { name: 'Friday async', meta: '8 players, eu-west-2', columns: 2, twoLines: true, withIcon: true, selected: false, withAction: true };

const ARG_TYPES: PlaygroundArgTypes<RowArgs> = {
    name: { group: 'Content', control: 'text', description: 'First line of the main column' },
    meta: { group: 'Content', control: 'text', description: 'Second line of the main column' },
    withIcon: { group: 'Content', control: 'boolean' },
    withAction: { group: 'Content', control: 'boolean' },
    columns: { group: 'Layout', control: 'select', options: [0, 1, 2, 3], description: 'Columns after the main one.' },
    twoLines: { group: 'Layout', control: 'boolean', description: 'Give each extra column a second line' },
    selected: { group: 'State', control: 'boolean' },
  };

const meta = {
  title: 'Composites · Lists/ListItemRow',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RowArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="list-item-row-story">
      <ListItemRow
        name={args.name}
        meta={args.meta || undefined}
        columns={sessionColumns(SESSIONS[0], Math.max(0, Math.min(3, args.columns)), args.twoLines === true)}
        icon={args.withIcon ? sessionIcon : undefined}
        selected={args.selected}
        onClick={() => undefined}
        action={args.withAction ? <Button size="sm" variant="secondary">Join</Button> : undefined}
      />
    </Box>
  ),
} satisfies PlaygroundStory<RowArgs>;

const FORMS = ['name only', 'icon and meta', 'one column', 'two-line columns', 'with action'] as const;

const formColumns = (form: typeof FORMS[number]): ListItemColumn[] | undefined => {
  if (form === 'one column') return sessionColumns(SESSIONS[0], 1, false);
  if (form === 'two-line columns' || form === 'with action') return sessionColumns(SESSIONS[0], 3, true);
  return undefined;
};

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Demonstrator
      rows={axis(FORMS)}
      align="stretch"
      cell={(form) => (
        <ListItemRow
          name="Friday async"
          meta={form === 'name only' ? undefined : '8 players, eu-west-2'}
          icon={form === 'name only' ? undefined : sessionIcon}
          columns={formColumns(form)}
          action={form === 'with action' ? <Button size="sm" variant="secondary">Join</Button> : undefined}
          actionVisibility="always"
        />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<RowArgs>;

const AlignedList = {
  name: 'Aligned list',
  render: () => <SessionList selectable={false} />,
} satisfies StoryLiteStoryDefinition<RowArgs>;

const Selectable = {
  name: 'Selectable list',
  render: () => <SessionList selectable />,
} satisfies StoryLiteStoryDefinition<RowArgs>;

const renderState = (props: StateProps) => (
  <ListItemRow
    name="Friday async"
    meta="8 players, eu-west-2"
    icon={sessionIcon}
    columns={sessionColumns(SESSIONS[0], 1, true)}
    action={<Button size="sm" variant="secondary">Join</Button>}
    onClick={() => undefined}
    {...props}
  />
);

const CODE = `import { ListItemList, ListItemRow } from '@drizztdourden08/tessera';

<ListItemList label="Sessions">
  {sessions.map((session) => (
    <ListItemRow
      key={session.id}
      icon={<Icon name="layers" />}
      name={session.name}
      meta={session.status}
      columns={[
        { primary: \`\${session.players} players\`, secondary: session.preset, align: 'end' },
        { primary: session.server, secondary: \`host \${session.host}\` },
      ]}
      selected={session.id === selectedId}
      onClick={() => setSelectedId(session.id)}
    />
  ))}
</ListItemList>`;

const Overview = overviewStory({
  component: 'ListItemRow',
  description: 'One row of a list: an icon, a name with a meta line under it, extra columns, and an action on the right.',
  points: [
    'Each of the `columns` takes a `primary` line, an optional `secondary` line and an `align`.',
    'Put rows in a `ListItemList` and their columns line up, each as wide as its widest cell.',
    '`selected`, `onClick` and `onDoubleClick` cover picking a row and opening it.',
    'The `action` shows on hover; `actionVisibility="always"` keeps it on.',
    'Every line takes any content, such as a [Status].',
  ],
  instead: '[DataTable] for many rows the user sorts and filters by column.',
  playground: Playground,
  variants: [AllVariants, AlignedList, Selectable],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { ...STATE.focus, target: '.list-item-row__main' },
      STATE.selected,
    ],
  },
  code: CODE,
});

export default meta;
export { AlignedList, AllVariants, Overview, Playground, Selectable };
