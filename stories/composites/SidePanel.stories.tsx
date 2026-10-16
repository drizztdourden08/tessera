/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
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
    collapsible: { group: 'Behaviour', control: 'boolean', description: 'A button in the heading folds the panel to a rail.' },
    actions: { group: 'Content', control: 'boolean', description: 'An Add button in the heading of the left panel, before the fold button.' },
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

const Overview = overviewStory({
  component: 'SidePanel',
  description: 'A raised panel beside the main view, with a heading, that folds to a rail and is dragged wider.',
  points: [
    'The heading names the panel; `actions` sits in it, before the button that folds it.',
    'Folded, it is a rail with its title down the side; a click on the title or the button opens it.',
    '`side="end"` puts the line on its left, for an inspector on the right.',
    '`width`, `minWidth` and `maxWidth` set its width in pixels; `storageKey` keeps the width and the fold.',
    '[[Enter]] on the line folds the panel and moves focus to the button that opens it.',
  ],
  instead: '[ListDetailLayout] for a list beside its detail; [StudioLayout] for a list, an editor and an inspector.',
  playground: Playground,
  variants: [Open, Folded],
  code: SIDE_PANEL_CODE,
});

export default meta;
export { Folded, Open, Overview, Playground };
