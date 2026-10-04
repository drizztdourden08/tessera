/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { WorkspaceDemo } from './_samples/WorkspaceDemo';

type WorkspaceArgs = {
  search: boolean;
  compactRows: boolean;
  readOnly: boolean;
  narrow: boolean;
  withSwitch: boolean;
};

const ARGS: Partial<WorkspaceArgs> = { search: true, compactRows: false, readOnly: false, narrow: false, withSwitch: true };

const ARG_TYPES: PlaygroundArgTypes<WorkspaceArgs> = {
  search: { group: 'Content', control: 'boolean', description: 'The search in the side nav. It searches every row of every page and shows the matches in the pane.' },
  withSwitch: { group: 'Content', control: 'boolean', description: 'A floating switch between sibling workspaces on the top edge.' },
  compactRows: { group: 'Appearance', control: 'boolean', description: 'One line per setting. The description moves to a tooltip on the title, the hint to a bubble under the control.' },
  narrow: { group: 'Layout', control: 'boolean', description: 'For a narrow window: the side nav stays a strip of icons and opens over the page.' },
  readOnly: { group: 'State', control: 'boolean', description: 'Every value as text, with the hint of the current value.' },
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
} satisfies PlaygroundStory<WorkspaceArgs>;

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
          { id: 'volume', title: 'Master volume', description: 'The loudness of every sound.', hint: 'Drag or use the arrow keys.', input: { kind: 'slider', value: volume, onChange: setVolume, min: 0, max: 100 } },
          {
            id: 'channels',
            title: 'Channels',
            noDescription: true,
            hint: 'Pick Mono for a single earbud.',
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
  description: 'The screen the user works in, such as a settings hub or a data manager: a side list of pages and the current page.',
  points: [
    '`content` holds the pages in nav groups; the screen builds the nav, the headers and the search from it.',
    'Each page holds sections of [SettingsRow] data, or any content of its own.',
    'The search runs over every row of every page and shows the matches by page, with their live controls.',
    'The screen owns the current page and the query unless `activeId` or `search.query` are given.',
    'Every page needs an icon and a title for its header; `backdrop={null}` drops the fading art.',
    '`compactRows` and `readOnly` reach every row, in the pages and in the search results.',
  ],
  instead: '[InfoScreen] for About or credits, [UtilityScreen] for one short task, [StageScreen] for one custom surface.',
  playground: Playground,
  variants: [Searching, CompactRows, ReadOnly, Narrow],
  code: CODE,
});

export default meta;
export { CompactRows, Narrow, Overview, Playground, ReadOnly, Searching };
