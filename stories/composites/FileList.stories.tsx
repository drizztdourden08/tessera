/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { FileList } from '../../src/composites';
import type { FileListProps } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { LOG_FILES, OUTPUT_FILES } from './_samples/file-samples.constants';
import { FileListDemo } from './_samples/FileListDemo';
import './FileList.stories.css';

type FileListArgs = {
  count: number;
  dense: boolean;
  open: boolean;
  reveal: boolean;
  narrow: boolean;
};

const noop = (): void => undefined;

const ARGS: Partial<FileListArgs> = { count: 7, dense: false, open: true, reveal: true, narrow: false };

const ARG_TYPES: PlaygroundArgTypes<FileListArgs> = {
  count: { group: 'Content', control: 'range', min: 0, max: 7, step: 1, description: 'How many files to list; none shows the empty line.' },
  dense: { group: 'Appearance', control: 'boolean', description: 'Shorter rows and smaller text.' },
  narrow: { group: 'Layout', control: 'boolean', description: 'A 448 px column, where long names cut short.' },
  open: { group: 'Behaviour', control: 'boolean', description: 'Passes onOpen, which adds the Open button.' },
  reveal: { group: 'Behaviour', control: 'boolean', description: 'Passes onReveal, which adds the Show in its folder button.' },
};

const meta = {
  title: 'Composites · Lists/FileList',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FileListArgs>;

const draw = (props: Partial<FileListProps>, narrow = false) => (
  <Box className={narrow ? 'file-list-story file-list-story--narrow' : 'file-list-story'}>
    <FileList files={OUTPUT_FILES} onOpen={noop} onReveal={noop} {...props} />
  </Box>
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw({
    files: OUTPUT_FILES.slice(0, args.count),
    dense: args.dense,
    onOpen: args.open ? noop : undefined,
    onReveal: args.reveal ? noop : undefined,
  }, args.narrow),
} satisfies PlaygroundStory<FileListArgs>;

const Output = {
  name: 'The output of a room',
  render: () => <FileListDemo />,
} satisfies StoryLiteStoryDefinition<FileListArgs>;

const Empty = {
  name: 'Before generation',
  render: () => draw({ files: [], empty: 'No output files yet. They show here once the seed is generated.' }),
} satisfies StoryLiteStoryDefinition<FileListArgs>;

const Dense = {
  name: 'Dense, in a narrow column',
  render: () => draw({ files: LOG_FILES, dense: true, onOpen: undefined }, true),
} satisfies StoryLiteStoryDefinition<FileListArgs>;

const CODE = `import { FileList } from '@drizztdourden08/tessera';

<FileList
  label="Output"
  files={run.outputs}
  onOpen={(path) => shell.openPath(path)}
  onReveal={(path) => shell.showItemInFolder(path)}
/>`;

const Overview = overviewStory({
  component: 'FileList',
  description: 'The files a job made or an app keeps, one row each with its size, its date and buttons to open it.',
  points: [
    'Each row draws a type icon from the extension, the name, the size and the date it changed.',
    '`onOpen` and `onReveal` add the Open and Show in its folder buttons; each gets the `path`.',
    '`size` is in bytes and `modified` in milliseconds; both are written with the [DataTable] formats.',
    '`icon` on a file replaces the icon of its extension, such as a save file of the app.',
    '`empty` says why there are no files yet; `dense` tightens the rows.',
  ],
  instead: '[ListItemRow] for rows that are not files, or [DataTable] to sort and filter many files.',
  playground: Playground,
  variants: [Output, Empty, Dense],
  states: {
    render: (props: StateProps) => draw({ files: OUTPUT_FILES.slice(0, 2), ...props }),
    list: [
      { name: 'Filled', props: {} },
      { name: 'Empty', props: { files: [] } },
    ],
  },
  code: CODE,
});

export default meta;
export { Dense, Empty, Output, Overview, Playground };
