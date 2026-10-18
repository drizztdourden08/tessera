/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ListDetailLayout, ListItemList, ListItemRow } from '../../src/composites';
import { Box, EmptyState, Icon } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { NAV_ICONS } from './_samples/nav';
import { SessionDetail } from './_samples/SessionDetail';
import { SESSIONS } from './_samples/sessions';
import './ListDetail.stories.css';

type ListDetailLayoutArgs = {
  startSelected: boolean;
  emptyMessage: string;
  collapsible: boolean;
  startCollapsed: boolean;
  ratio: boolean;
  detailCollapsible: boolean;
  startDetailCollapsed: boolean;
  narrow: boolean;
};

const PICK = 'Pick a session to see who plays in it.';

const ARGS: ListDetailLayoutArgs = {
  startSelected: true, emptyMessage: PICK, collapsible: true, startCollapsed: false,
  ratio: false, detailCollapsible: false, startDetailCollapsed: false, narrow: false,
};

const LIST_RATIO = 0.6;

const LayoutDemo = (props: Partial<ListDetailLayoutArgs>) => {
  const { startSelected, emptyMessage, collapsible, startCollapsed, ratio, detailCollapsible, startDetailCollapsed, narrow } = { ...ARGS, ...props };
  const [selectedId, setSelectedId] = useState<string | null>(startSelected ? SESSIONS[0].id : null);
  const selected = SESSIONS.find((s) => s.id === selectedId);
  const list = (
    <ListItemList heading="Sessions" count={SESSIONS.length}>
      {SESSIONS.map((s) => (
        <ListItemRow
          key={s.id}
          icon={<Icon name={NAV_ICONS.sessions} />}
          name={s.name}
          meta={`${s.players} players · ${s.server}`}
          selected={s.id === selectedId}
          onClick={() => setSelectedId(s.id)}
        />
      ))}
    </ListItemList>
  );
  return (
    <Box className={`list-detail-story list-detail-story--tall${narrow ? ' list-detail-story--narrow' : ''}`}>
      <ListDetailLayout
        list={list}
        detail={selected && <SessionDetail session={selected} />}
        emptyDetail={<EmptyState icon={<Icon name={NAV_ICONS.sessions} />} message={emptyMessage} />}
        onBack={() => setSelectedId(null)}
        collapsible={collapsible}
        defaultCollapsed={startCollapsed}
        listRatio={ratio ? LIST_RATIO : undefined}
        detailCollapsible={detailCollapsible}
        defaultDetailCollapsed={startDetailCollapsed}
        listLabel="sessions"
        detailLabel="session details"
      />
    </Box>
  );
};

const ARG_TYPES: PlaygroundArgTypes<ListDetailLayoutArgs> = {
  emptyMessage: { group: 'Content', control: 'text', description: 'The placeholder while nothing is picked, passed as emptyDetail.' },
  startSelected: { group: 'State', control: 'boolean' },
  collapsible: { group: 'Behaviour', control: 'boolean', description: 'A button beside the divider folds the list to a rail; dragging the divider past the minimum width folds it too.' },
  startCollapsed: { group: 'State', control: 'boolean', description: 'The list starts folded, as defaultCollapsed.' },
  ratio: { group: 'Layout', control: 'boolean', description: 'listRatio={0.6}: the list takes 60 % of the room and the divider drags the share.' },
  detailCollapsible: { group: 'Behaviour', control: 'boolean', description: 'A second button on the other side of the divider folds the detail to a rail.' },
  startDetailCollapsed: { group: 'State', control: 'boolean', description: 'The detail starts folded, as defaultDetailCollapsed.' },
  narrow: { group: 'Layout', control: 'boolean', description: 'A 512 px frame: under 768 px the list and the detail stack, with Back in the detail.' },
};

const meta = {
  title: 'Composites · Layout/ListDetailLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ListDetailLayoutArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayoutDemo key={`${String(args.startSelected)}-${String(args.startCollapsed)}-${String(args.startDetailCollapsed)}-${String(args.ratio)}`} {...args} />,
} satisfies PlaygroundStory<ListDetailLayoutArgs>;

const Resizable = {
  name: 'Sessions: drag the divider, drag the list narrower to fold it, or use its button',
  render: () => <LayoutDemo />,
} satisfies StoryLiteStoryDefinition<ListDetailLayoutArgs>;

const Collapsed = {
  name: 'The list folded to a rail',
  render: () => <LayoutDemo startCollapsed />,
} satisfies StoryLiteStoryDefinition<ListDetailLayoutArgs>;

const RatioColumns = {
  name: 'Columns by share: the list takes 60 %, and the detail folds too',
  render: () => <LayoutDemo ratio detailCollapsible />,
} satisfies StoryLiteStoryDefinition<ListDetailLayoutArgs>;

const DetailFolded = {
  name: 'The detail folded to a rail',
  render: () => <LayoutDemo ratio detailCollapsible startDetailCollapsed />,
} satisfies StoryLiteStoryDefinition<ListDetailLayoutArgs>;

const Stacked = {
  name: 'A small window: the list, then the detail with Back',
  render: () => <LayoutDemo startSelected={false} narrow />,
} satisfies StoryLiteStoryDefinition<ListDetailLayoutArgs>;

const renderState = (props: StateProps) => <LayoutDemo startSelected={props.empty !== true} />;

const CODE = `import { ListDetailLayout, ListItemList, ListItemRow } from '@drizztdourden08/tessera';

const [selectedId, setSelectedId] = useState<string | null>(null);
const selected = sessions.find((s) => s.id === selectedId);

<ListDetailLayout
  list={(
    <ListItemList heading="Sessions">
      {sessions.map((s) => (
        <ListItemRow key={s.id} name={s.name} selected={s.id === selectedId} onClick={() => setSelectedId(s.id)} />
      ))}
    </ListItemList>
  )}
  detail={selected && <SessionDetail session={selected} />}
  onBack={() => setSelectedId(null)}
  storageKey="sessions.list"
/>`;

const Overview = overviewStory({
  component: 'ListDetailLayout',
  description: 'The two panes of a list and detail screen: the list on the left, the detail of the picked item beside it.',
  points: [
    'Each pane scrolls on its own surface; `listScroll` or `detailScroll` false leaves the scroll to its content.',
    'No `detail` shows `emptyDetail`, or Pick an item from the list, and a small window shows the list.',
    'Drag the divider from 240 to 480 px, or give `listRatio` a share; `storageKey` keeps it.',
    'The button beside the divider, or a drag past the minimum, folds the list; drag the rail out to open it.',
    '`detailCollapsible` folds the detail the same way, from the other side of the divider.',
    'Under 768 px the panes stack: the list, then the detail with a Back button that calls `onBack`.',
  ],
  instead: '[ListDetail] for an editor that asks before unsaved edits are lost, or [SplitPane] for two equal panes.',
  playground: Playground,
  variants: [Resizable, Collapsed, RatioColumns, DetailFolded, Stacked],
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
export { Collapsed, DetailFolded, Overview, Playground, RatioColumns, Resizable, Stacked };
