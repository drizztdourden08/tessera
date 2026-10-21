/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { ControlsPageSample } from './_samples/ControlsPageSample';
import { OutlinePanelSample } from './_samples/OutlinePanelSample';
import { SIDE_PANEL_CODE } from './_samples/side-panel-story.constants';
import './SidePanel.stories.css';

type SidePanelArgs = { folded: boolean; collapsible: boolean; actions: boolean };

const meta = {
  title: 'Composites · Layout/SidePanel',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SidePanelArgs>;

const Playground = {
  name: 'Playground',
  args: { folded: false, collapsible: true, actions: true },
  argTypes: {
    folded: { group: 'State', control: 'boolean', description: 'Both panels start folded to a rail, as defaultCollapsed.' },
    collapsible: { group: 'Behaviour', control: 'boolean', description: 'The round button beside the edge line folds the panel to a rail, and dragging the line narrower than the minimum width folds it too.' },
    actions: { group: 'Content', control: 'boolean', description: 'An Add button in the heading of the left panel.' },
  },
  render: (args) => <OutlinePanelSample key={String(args.folded)} {...args} />,
} satisfies PlaygroundStory<SidePanelArgs>;

const Open = {
  name: 'A studio: layers and an inspector that resize and fold',
  render: () => <OutlinePanelSample actions />,
} satisfies StoryLiteStoryDefinition<SidePanelArgs>;

const Folded = {
  name: 'The studio folded: each title written down its rail',
  render: () => <OutlinePanelSample folded />,
} satisfies StoryLiteStoryDefinition<SidePanelArgs>;

const DragToFold = {
  name: 'Drag to fold: pull a panel narrower than its minimum, then drag it out again',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Drag the line of a panel past its minimum width and it snaps to its rail. Drag the line of a rail outward and it opens. With the line focused, an arrow key at the end of the range does the same.</Text>
      <OutlinePanelSample actions />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SidePanelArgs>;

const Controls = {
  name: 'A controls page: the same panels, resizable like any other, and devices that glow',
  render: () => <ControlsPageSample />,
} satisfies StoryLiteStoryDefinition<SidePanelArgs>;

const ControlsFolded = {
  name: 'The controls page folded: actions, title and icons, the glow past the edge',
  render: () => <ControlsPageSample folded />,
} satisfies StoryLiteStoryDefinition<SidePanelArgs>;

const Overview = overviewStory({
  component: 'SidePanel',
  description: 'A sunken panel beside the main view, with a heading, that folds to a rail and is dragged wider.',
  points: [
    'The body sits on the sunken surface; the heading names the panel and holds `actions`.',
    'A thin line runs down its inner edge, with the round [CollapseToggle] beside it, level with the heading.',
    'Every panel resizes by drag or arrow keys; pulled under its minimum it folds, and the rail drags open.',
    'Folded, it is a 60 px rail: a reserved action slot, the title written sideways, then `railItems`, such as icons.',
    'A glow around a rail icon spreads past the rail; `side="end"` mirrors the line, the toggle and the title.',
    '`width`, `minWidth` and `maxWidth` set the width; `storageKey` keeps it and the fold.',
  ],
  instead: '[ListDetailLayout] for a list beside its detail; [StudioLayout] for a list, an editor and an inspector.',
  playground: Playground,
  variants: [Open, Folded, DragToFold, Controls, ControlsFolded],
  code: SIDE_PANEL_CODE,
});

export default meta;
export { Controls, ControlsFolded, DragToFold, Folded, Open, Overview, Playground };
