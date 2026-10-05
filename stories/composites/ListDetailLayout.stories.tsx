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
  resizable: boolean;
  collapsible: boolean;
  startCollapsed: boolean;
  narrow: boolean;
};

const PICK = 'Pick a session to see who plays in it.';

const LayoutDemo = (props: Partial<ListDetailLayoutArgs>) => {
  const { startSelected = true, emptyMessage = PICK, resizable = true, collapsible = true, startCollapsed = false, narrow = false } = props;
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
        resizable={resizable}
        collapsible={collapsible}
        defaultCollapsed={startCollapsed}
        listLabel="sessions"
        detailLabel="session details"
      />
    </Box>
  );
};

const ARGS: Partial<ListDetailLayoutArgs> = { startSelected: true, emptyMessage: PICK, resizable: true, collapsible: true, startCollapsed: false, narrow: false };

const ARG_TYPES: PlaygroundArgTypes<ListDetailLayoutArgs> = {
  emptyMessage: { group: 'Content', control: 'text', description: 'The placeholder while nothing is picked, passed as emptyDetail.' },
  startSelected: { group: 'State', control: 'boolean' },
  resizable: { group: 'Behaviour', control: 'boolean', description: 'A divider between the panes drags the list width, from 240 to 480 px.' },
  collapsible: { group: 'Behaviour', control: 'boolean', description: 'A button at the top of the divider folds the list to a rail.' },
  startCollapsed: { group: 'State', control: 'boolean', description: 'The list starts folded, as defaultCollapsed.' },
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
  render: (args) => <LayoutDemo key={`${String(args.startSelected)}-${String(args.startCollapsed)}`} {...args} />,
} satisfies PlaygroundStory<ListDetailLayoutArgs>;

const Resizable = {
  name: 'Sessions: drag the divider, or fold the list with its button',
  render: () => <LayoutDemo />,
} satisfies StoryLiteStoryDefinition<ListDetailLayoutArgs>;

const Collapsed = {
  name: 'The list folded to a rail',
  render: () => <LayoutDemo startCollapsed />,
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
    'Pass the `list` and the `detail` as content; each pane scrolls on its own surface.',
    'No `detail` shows `emptyDetail`, or Pick an item from the list, and a small window shows the list.',
    'Drag the divider between 240 and 480 px; `storageKey` keeps the width and whether the list is folded.',
    'The button over the divider, or [[Enter]] on it, folds the list to a rail; `collapsed` lets the app hold it.',
    'Under 768 px the panes stack: the list, then the detail with a Back button that calls `onBack`.',
    '**It is layout only:** the caller fills both panes and owns the selection, so `onBack` clears it.',
  ],
  instead: '[ListDetail] for an editor that asks before unsaved edits are lost, or [SplitPane] for two equal panes.',
  playground: Playground,
  variants: [Resizable, Collapsed, Stacked],
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
export { Collapsed, Overview, Playground, Resizable, Stacked };
