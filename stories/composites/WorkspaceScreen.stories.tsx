/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { WorkspaceDemo } from './_samples/WorkspaceDemo';

type WorkspaceArgs = {
  pageHeader: boolean;
  search: boolean;
  compactRows: boolean;
  readOnly: boolean;
  narrow: boolean;
  withSwitch: boolean;
};

const ARGS: Partial<WorkspaceArgs> = { pageHeader: true, search: true, compactRows: false, readOnly: false, narrow: false, withSwitch: true };

const ARG_TYPES: StoryLiteArgTypes<WorkspaceArgs> = {
  pageHeader: { control: 'boolean', description: 'The page header: icon, title, section pills and the fading backdrop. It compacts once the page scrolls.' },
  search: { control: 'boolean', description: 'The search in the side nav. It searches every row of every page and shows the matches in the pane.' },
  compactRows: { control: 'boolean', description: 'One line per setting. The description moves to a tooltip on the title, the hint to a bubble under the control.' },
  readOnly: { control: 'boolean', description: 'Every value as text, with the hint of the current value.' },
  narrow: { control: 'boolean', description: 'For a narrow window: the side nav stays a strip of icons and opens over the page.' },
  withSwitch: { control: 'boolean', description: 'A floating switch between sibling workspaces on the top edge.' },
};

const meta = {
  title: 'Composites · Screens/WorkspaceScreen',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WorkspaceArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WorkspaceDemo {...args} key={JSON.stringify(args)} />,
} satisfies StoryLiteStoryDefinition<WorkspaceArgs>;

const Searching = {
  name: 'Searching every page',
  render: () => <WorkspaceDemo query="o" />,
} satisfies StoryLiteStoryDefinition<WorkspaceArgs>;

const CompactRows = {
  name: 'Compact rows',
  render: () => <WorkspaceDemo compactRows startPage="audio" />,
} satisfies StoryLiteStoryDefinition<WorkspaceArgs>;

const ReadOnly = {
  name: 'Read only',
  render: () => <WorkspaceDemo readOnly startPage="display" />,
} satisfies StoryLiteStoryDefinition<WorkspaceArgs>;

const NoHeader = {
  name: 'Without the page header',
  render: () => <WorkspaceDemo pageHeader={false} />,
} satisfies StoryLiteStoryDefinition<WorkspaceArgs>;

const Narrow = {
  name: 'A narrow window',
  render: () => <WorkspaceDemo narrow />,
} satisfies StoryLiteStoryDefinition<WorkspaceArgs>;

const CODE = `import { WorkspaceScreen } from '@drizztdourden08/tessera';
import type { WorkspaceContent } from '@drizztdourden08/tessera';

const content: WorkspaceContent = {
  home: { id: 'home', title: 'Overview', icon: <Icon name="house" />, content: <Overview /> },
  groups: [{
    id: 'app',
    label: 'App',
    pages: [{
      id: 'audio',
      title: 'Audio',
      icon: <Icon name="volume-2" />,
      sections: [{
        id: 'output',
        title: 'Output',
        rows: [
          { id: 'volume', title: 'Master volume', input: { kind: 'slider', value: volume, onChange: setVolume, min: 0, max: 100 } },
          {
            id: 'channels',
            title: 'Channels',
            input: { kind: 'segmented', value: channels, onChange: setChannels, options: [
              { value: '1', label: 'Mono', hint: 'Folds the output to one channel.' },
              { value: '2', label: 'Stereo', hint: 'Keeps left and right apart.' },
            ] },
          },
        ],
      }],
    }],
  }],
};

<WorkspaceScreen title="Settings" onClose={close} content={content} />`;

const Overview = overviewStory({
  component: 'WorkspaceScreen',
  description: 'The screen the user works in: a settings hub, a profile hub or a data manager. It takes one content object, the pages in their nav groups, and builds everything from it: the side nav, the page header with its icon, its title and a pill per section, the sections and their rows, and the search. Each page holds sections of SettingsRow data, or any content of its own. The page header sits over a backdrop that fades out behind the title, and it compacts once the page scrolls. The search in the side nav runs over every row of every page; while it runs, the pane shows the matches grouped by page, with the real controls, a chip for every page whose name matches and an Open page button that opens the page on the first match.',
  points: [
    'The screen owns the current page and the query unless activeId or search.query are given.',
    'pageHeader={false} drops the header for a page that brings its own; backdrop={null} drops the fading art.',
    'compactRows and readOnly reach every row on every page and in the search results.',
    'For About or credits, use InfoScreen. For one short task with a status, use UtilityScreen. For one big custom surface, use StageScreen.',
  ],
  playground: Playground,
  variants: [Searching, CompactRows, ReadOnly, NoHeader, Narrow],
  code: CODE,
});

export default meta;
export { CompactRows, Narrow, NoHeader, Overview, Playground, ReadOnly, Searching };
