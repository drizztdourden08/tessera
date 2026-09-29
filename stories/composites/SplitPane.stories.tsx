/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { ListItemRow, SplitPane } from '../../src/composites';
import type { CollapsedSide } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ITEM_LOG, PLAYERS } from './_samples/sessions';
import './SplitPane.stories.css';

type SplitArgs = {
  defaultRatio: number;
  snapAt: number;
  defaultCollapsed: CollapsedSide;
  startLabel: string;
  endLabel: string;
};

const PlayerPane = () => (
  <Box className="split-pane-story__pane">
    <Text className="story-label">Players</Text>
    {PLAYERS.map((p) => <ListItemRow key={p.slot} name={p.name} meta={`${p.game}, ${p.checks}`} />)}
  </Box>
);

const LogPane = () => (
  <Box className="split-pane-story__pane">
    <Text className="story-label">Item log</Text>
    {ITEM_LOG.map((line) => <Text key={line}>{line}</Text>)}
  </Box>
);

const SplitDemo = (props: SplitArgs) => {
  const { defaultRatio, snapAt, defaultCollapsed, startLabel, endLabel } = props;
  return (
    <Box className="story-column">
      <Text className="story-label">Drag the divider, use the arrow keys on it, or drag a pane past the snap point</Text>
      <Box className="story-frame split-pane-story__frame">
        <SplitPane
          key={`${defaultRatio}-${snapAt}-${defaultCollapsed}`}
          start={<PlayerPane />}
          end={<LogPane />}
          defaultRatio={defaultRatio}
          snapAt={snapAt}
          defaultCollapsed={defaultCollapsed}
          startLabel={startLabel}
          endLabel={endLabel}
        />
      </Box>
    </Box>
  );
};

const ARGS: Partial<SplitArgs> = { defaultRatio: 0.58, snapAt: 0.14, defaultCollapsed: 'none', startLabel: 'players', endLabel: 'item log' };

const ARG_TYPES: StoryLiteArgTypes<SplitArgs> = {
    defaultRatio: { control: 'number' },
    snapAt: { control: 'number' },
    defaultCollapsed: { control: 'select', options: ['none', 'start', 'end'] },
    startLabel: { control: 'text' },
    endLabel: { control: 'text' },
  };

const meta = {
  title: 'Composites · Navigation/SplitPane',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SplitArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SplitDemo {...args} />,
} satisfies StoryLiteStoryDefinition<SplitArgs>;

const EvenSplit = {
  name: 'Even split',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SplitDemo {...args} defaultRatio={0.5} />,
} satisfies StoryLiteStoryDefinition<SplitArgs>;

const renderState = (props: StateProps) => (
  <Box className="story-frame split-pane-story__state">
    <SplitPane
      start={<Text className="story-label">Players</Text>}
      end={<Text className="story-label">Item log</Text>}
      startLabel="players"
      endLabel="item log"
      defaultCollapsed={props.collapsed === true ? 'start' : 'none'}
    />
  </Box>
);

const CODE = `import { SplitPane } from '@drizztdourden08/tessera';

<SplitPane
  start={<PlayerList />}
  end={<ItemLog />}
  defaultRatio={0.58}
  startLabel="players"
  endLabel="item log"
/>`;

const Overview = overviewStory({
  component: 'SplitPane',
  description: 'Two panes side by side with a divider the user drags to resize them. Reach for it when two views share a width and either may need the room, such as a player list beside an item log. Dragging a pane below the snap point hides it and leaves a labelled rail that brings it back on a click or a drag; the divider also takes the arrow keys, and a double-click resets it. It fills the height of its parent, so the parent needs one.',
  playground: Playground,
  variants: [EvenSplit],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.split-pane__divider' },
      { ...STATE.focus, target: '.split-pane__divider' },
      { ...STATE.active, name: 'Dragging', target: '.split-pane__divider' },
      { name: 'Collapsed', props: { collapsed: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { EvenSplit, Overview, Playground };
