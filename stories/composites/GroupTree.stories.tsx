/* @layer stories @kind story */
import { useCallback, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { GroupTree, ListItemRow } from '../../src/composites';
import type { TreeNode } from '../../src/composites';
import { Box, Button, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { EMPTY_TREE, FLAT_TREE, SERVER_TREE } from './_samples/sessions';
import type { SamplePlayer } from './_samples/sessions';

type TreeArgs = {
  expandToDepth: number;
  emptyLabel: string;
};

const renderPlayers = (players: SamplePlayer[]) => (
  <Box className="story-column">
    {players.map((p) => <ListItemRow key={p.slot} name={`${p.slot}. ${p.name}`} meta={`${p.game}, ${p.checks} checks`} />)}
  </Box>
);

const TreeDemo = (props: TreeArgs & { root: TreeNode<SamplePlayer> }) => {
  const { root, expandToDepth, emptyLabel } = props;
  return (
    <Box className="story-column">
      <GroupTree key={expandToDepth} root={root} renderItems={renderPlayers} expandToDepth={expandToDepth} emptyLabel={emptyLabel} />
    </Box>
  );
};

const ControlledDemo = () => {
  const [open, setOpen] = useState<readonly string[]>(['eu-west-2']);
  const [shown, setShown] = useState(true);
  const toggle = useCallback((key: string) => {
    setOpen((keys) => (keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key]));
  }, []);
  return (
    <Box className="story-column">
      <Box className="story-row">
        <Button size="sm" variant="secondary" onClick={() => setShown(!shown)}>{shown ? 'Hide tree' : 'Show tree'}</Button>
        <Text className="story-label">Open: {open.join(', ') || 'none'}</Text>
      </Box>
      {shown && <GroupTree root={SERVER_TREE} renderItems={renderPlayers} expandedKeys={open} onToggleKey={toggle} />}
    </Box>
  );
};

const ARGS: Partial<TreeArgs> = { expandToDepth: 1, emptyLabel: 'No players in this session yet.' };

const ARG_TYPES: StoryLiteArgTypes<TreeArgs> = {
    expandToDepth: { control: 'number' },
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
  render: (args) => (
    <GroupTree
      key={args.expandToDepth}
      root={SERVER_TREE}
      renderItems={renderPlayers}
      expandToDepth={args.expandToDepth}
      emptyLabel={args.emptyLabel}
    />
  ),
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const FullyExpanded = {
  name: 'Fully expanded',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TreeDemo {...args} root={SERVER_TREE} expandToDepth={2} />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const Flat = {
  name: 'Ungrouped',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TreeDemo {...args} root={FLAT_TREE} />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const Controlled = {
  name: 'Controlled expansion',
  render: () => <ControlledDemo />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const STATE_TREE: TreeNode<SamplePlayer> = { ...SERVER_TREE, children: SERVER_TREE.children.slice(1) };

const renderState = (props: StateProps) => (
  <GroupTree
    root={props.empty === true ? EMPTY_TREE : STATE_TREE}
    renderItems={renderPlayers}
    expandToDepth={props.open === true ? 1 : 0}
    emptyLabel="No players in this session yet."
  />
);

const Overview = overviewStory({
  component: 'GroupTree',
  description: 'A tree of collapsible sections, nested to any depth, whose leaves the caller draws. Reach for it to group a long list, such as players by server and then by session. The tree owns the nesting, the section headers and which sections are open; renderItems draws the leaves, and a root with no children renders its items flat. expandToDepth opens the top levels on mount, expandedKeys with onToggleKey hands expansion to the caller, and an empty tree shows emptyLabel.',
  playground: Playground,
  variants: [FullyExpanded, Flat],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.group-tree__header' },
      { ...STATE.focus, target: '.group-tree__header' },
      { name: 'Empty', props: { empty: true } },
      { ...STATE.open, name: 'Expanded' },
    ],
  },
});

export default meta;
export { Controlled, Flat, FullyExpanded, Overview, Playground };
