/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ControlsPageSample } from './_samples/ControlsPageSample';
import { OutlinePanelSample } from './_samples/OutlinePanelSample';
import { SIDE_PANEL_CODE } from './_samples/side-panel-story.constants';
import './SidePanel.stories.css';

type SidePanelArgs = { folded: boolean; resizable: boolean; collapsible: boolean; actions: boolean };

const meta = {
  title: 'Composites · Layout/SidePanel',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SidePanelArgs>;

const Playground = {
  name: 'Playground',
  args: { folded: false, resizable: true, collapsible: true, actions: true },
  argTypes: {
    folded: { group: 'State', control: 'boolean', description: 'Both panels start folded to a rail, as defaultCollapsed.' },
    resizable: { group: 'Behaviour', control: 'boolean', description: 'A line beside each panel drags it wider or narrower.' },
    collapsible: { group: 'Behaviour', control: 'boolean', description: 'The round button on the inner edge folds the panel to a rail.' },
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

const Controls = {
  name: 'A controls page: panels that only fold, and devices that glow',
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
    'A line runs down its inner edge, with the round [CollapseToggle] on it, level with the heading.',
    '`resizable` puts a grip on that line to drag; with `resizable={false}` the line and toggle stay the same.',
    'Folded, it is a 60 px rail: `actions`, the title written sideways, then `rail`, such as icons.',
    'A glow around a rail icon spreads past the rail; `side="end"` mirrors the line, the toggle and the title.',
    '`width`, `minWidth` and `maxWidth` set the width; `storageKey` keeps it and the fold.',
  ],
  instead: '[ListDetailLayout] for a list beside its detail; [StudioLayout] for a list, an editor and an inspector.',
  playground: Playground,
  variants: [Open, Folded, Controls, ControlsFolded],
  code: SIDE_PANEL_CODE,
});

export default meta;
export { Controls, ControlsFolded, Folded, Open, Overview, Playground };
