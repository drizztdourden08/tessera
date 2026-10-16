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
  name: 'A layer list and an inspector around a canvas',
  render: () => <OutlinePanelSample actions />,
} satisfies StoryLiteStoryDefinition<SidePanelArgs>;

const Folded = {
  name: 'Folded to a rail',
  render: () => <OutlinePanelSample folded />,
} satisfies StoryLiteStoryDefinition<SidePanelArgs>;

const Controls = {
  name: 'A controls page: profiles, bindings and devices to drag',
  render: () => <ControlsPageSample />,
} satisfies StoryLiteStoryDefinition<SidePanelArgs>;

const ControlsFolded = {
  name: 'The controls page with both panels folded',
  render: () => <ControlsPageSample folded />,
} satisfies StoryLiteStoryDefinition<SidePanelArgs>;

const Overview = overviewStory({
  component: 'SidePanel',
  description: 'A raised panel beside the main view, with a heading, that folds to a rail and is dragged wider.',
  points: [
    'The heading names the panel and holds `actions`; the round CollapseToggle on its inner edge folds it.',
    'Folded, it is the rail of SideNav with its title down the side, or `rail` in its place, such as icons.',
    'It holds anything: lists, inputs and drag sources keep working, and stay mounted while it is folded.',
    '`side="end"` puts the line and the toggle on its left; a plain flex row is all it needs around it.',
    '`width`, `minWidth` and `maxWidth` set its width in pixels; `storageKey` keeps the width and the fold.',
    '[[Enter]] on the line folds the panel and moves focus to the button that opens it.',
  ],
  instead: '[ListDetailLayout] for a list beside its detail; [StudioLayout] for a list, an editor and an inspector.',
  playground: Playground,
  variants: [Open, Folded, Controls, ControlsFolded],
  code: SIDE_PANEL_CODE,
});

export default meta;
export { Controls, ControlsFolded, Folded, Open, Overview, Playground };
