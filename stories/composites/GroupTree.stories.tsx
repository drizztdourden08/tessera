/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { GroupTree } from '../../src/composites';
import type { TreeNode } from '../../src/composites';
import { Box, Icon, Span, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { EMPTY_TREE, FLAT_TREE, SERVER_TREE } from './_samples/sessions';
import type { SamplePlayer } from './_samples/sessions';
import './GroupTree.stories.css';

type TreeArgs = {
  expandToDepth: number;
  showCounts: boolean;
  icons: boolean;
  emptyLabel: string;
};

const withIcons = (node: TreeNode<SamplePlayer>, depth = 0): TreeNode<SamplePlayer> => ({
  ...node,
  icon: depth === 1 ? <Icon name="server" /> : <Icon name="layers" />,
  meta: depth === 1 ? node.meta : undefined,
  children: node.children.map((child) => withIcons(child, depth + 1)),
});

const ICON_TREE = withIcons(SERVER_TREE);

const playerKey = (player: SamplePlayer): string => `slot-${player.slot}`;
const playerIcon = () => <Icon name="user" />;

const renderPlayer = (player: SamplePlayer) => (
  <>
    <Span>{player.name}</Span>
    <Span tone="muted" className="group-tree-story__aside">{`${player.game}, ${player.checks} checks`}</Span>
  </>
);

const TreeDemo = (props: TreeArgs & { root: TreeNode<SamplePlayer> }) => {
  const { root, expandToDepth, showCounts, icons, emptyLabel } = props;
  const [selected, setSelected] = useState<string | null>(null);
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <Box className="story-column group-tree-story">
      <GroupTree
        key={expandToDepth}
        root={icons ? root : SERVER_TREE}
        getItemKey={playerKey}
        renderItem={renderPlayer}
        itemIcon={icons ? playerIcon : undefined}
        selectedKey={selected}
        onSelect={(key) => setSelected(key)}
        onActivate={(player) => setOpened(player.name)}
        expandToDepth={expandToDepth}
        showCounts={showCounts}
        label="Players by server"
        emptyLabel={emptyLabel}
      />
      <Text className="story-label">{opened ? `Opened ${opened}` : `Selected: ${selected ?? 'none'}`}</Text>
    </Box>
  );
};

const ControlledDemo = () => {
  const [open, setOpen] = useState<readonly string[]>(['eu-west-2']);
  return (
    <Box className="story-column group-tree-story">
      <Text className="story-label">Open: {open.join(', ') || 'none'}</Text>
      <GroupTree
        root={ICON_TREE}
        getItemKey={playerKey}
        renderItem={renderPlayer}
        itemIcon={playerIcon}
        expandedKeys={open}
        onExpandedChange={setOpen}
        label="Players by server"
      />
    </Box>
  );
};

const ARGS: Partial<TreeArgs> = { expandToDepth: 2, showCounts: true, icons: true, emptyLabel: 'No players in this session yet.' };

const ARG_TYPES: StoryLiteArgTypes<TreeArgs> = {
    expandToDepth: { control: 'number', description: 'Levels open on mount' },
    showCounts: { control: 'boolean', description: 'Item count on each group' },
    icons: { control: 'boolean', description: 'Icons per group and per item' },
    emptyLabel: { control: 'text' },
  };

const meta = {
  title: 'Composites · Lists/GroupTree',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TreeArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TreeDemo {...args} root={ICON_TREE} />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const FullyExpanded = {
  name: 'Players by server and session',
  render: () => <TreeDemo expandToDepth={2} showCounts icons emptyLabel="" root={ICON_TREE} />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const Flat = {
  name: 'No groups',
  render: () => <TreeDemo expandToDepth={0} showCounts icons emptyLabel="" root={FLAT_TREE} />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const Controlled = {
  name: 'Controlled expansion',
  render: () => <ControlledDemo />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const STATE_TREE: TreeNode<SamplePlayer> = { ...ICON_TREE, children: ICON_TREE.children.slice(1) };

const renderState = (props: StateProps) => (
  <Box className="group-tree-story">
    <GroupTree
      root={props.empty === true ? EMPTY_TREE : STATE_TREE}
      getItemKey={playerKey}
      renderItem={renderPlayer}
      itemIcon={playerIcon}
      selectedKey={props.selected === true ? 'slot-3' : null}
      expandToDepth={props.open === true || props.selected === true ? 2 : 0}
      label="Players by server"
      emptyLabel="No players in this session yet."
    />
  </Box>
);

const CODE = `import { GroupTree } from '@drizztdourden08/tessera';

<GroupTree
  root={serverTree}
  getItemKey={(player) => player.id}
  renderItem={(player) => player.name}
  itemIcon={() => <Icon name="user" />}
  selectedKey={selectedId}
  onSelect={(key) => setSelectedId(key)}
  onActivate={(player) => openPlayer(player)}
  expandToDepth={1}
  label="Players by server"
/>`;

const Overview = overviewStory({
  component: 'GroupTree',
  description: 'A tree of groups that open and close, nested to any depth, with the items of each group as leaves. Reach for it to browse a long list sorted into groups, such as players by server and then by session. Each level is indented with a guide line down to its last row, each group shows an icon and the count of items under it, and the guide of the selected branch is lit. It is a real tree for keyboards and screen readers: arrows move, Right opens, Left closes or goes to the parent, Home and End jump, Enter selects. expandToDepth opens the top levels on mount, and expandedKeys with onExpandedChange hand expansion to the caller.',
  playground: Playground,
  variants: [FullyExpanded, Flat, Controlled],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.group-tree__row' },
      { ...STATE.focus, target: '.group-tree__row' },
      { ...STATE.open, name: 'Expanded' },
      STATE.selected,
      { name: 'Empty', props: { empty: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Controlled, Flat, FullyExpanded, Overview, Playground };
