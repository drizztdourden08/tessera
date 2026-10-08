/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Grid, Stack, Text } from '../../src/primitives';
import type { SpaceToken } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { RunDashboard } from './_samples/RunDashboard';
import { RUN_TEXT } from './_samples/run-dashboard.constants';
import './Grid.stories.css';

type GridArgs = {
  columns: number;
  minColWidth: number;
  gap: SpaceToken;
  dense: boolean;
  count: number;
};

const FILES = [
  { name: 'save-slot-1.sav', size: '8 KB' },
  { name: 'save-slot-2.sav', size: '8 KB' },
  { name: 'controller-profile.json', size: '2 KB' },
  { name: 'session-log.txt', size: '41 KB' },
  { name: 'screenshot-0412.png', size: '96 KB' },
  { name: 'screenshot-0413.png', size: '101 KB' },
  { name: 'settings.ini', size: '1 KB' },
  { name: 'seed-archive.zip', size: '380 KB' },
  { name: 'tracker-layout.json', size: '5 KB' },
  { name: 'audio-pack.msu', size: '12 MB' },
];

const ARGS: Partial<GridArgs> = { columns: 3, minColWidth: 0, gap: 'sm', dense: false, count: 8 };

const ARG_TYPES: PlaygroundArgTypes<GridArgs> = {
    count: { group: 'Content', control: 'number' },
    columns: { group: 'Layout', control: 'number', description: 'Fixed column count.' },
    minColWidth: { group: 'Layout', control: 'number', description: 'Auto-fill minimum width in px. 0 turns it off.' },
    gap: { group: 'Layout', control: 'select', options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    dense: { group: 'Layout', control: 'boolean', description: 'A later small cell fills the hole a wide one left.' },
  };

const meta = {
  title: 'Primitives · Layout/Grid',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<GridArgs>;

const FileTiles = ({ count }: { count: number }) => (
  <>
    {FILES.slice(0, Math.max(0, count)).map((file) => (
      <Stack key={file.name} gap="xs" className="grid-demo__tile">
        <Text className="grid-demo__name">{file.name}</Text>
        <Text variant="caption">{file.size}</Text>
      </Stack>
    ))}
  </>
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Grid columns={args.columns || undefined} minColWidth={args.minColWidth || undefined} gap={args.gap} dense={args.dense}>
      <FileTiles count={args.count} />
    </Grid>
  ),
} satisfies PlaygroundStory<GridArgs>;

const FixedColumns = {
  name: 'Fixed columns',
  render: () => (
    <Demonstrator
      rows={[2, 3, 4].map((columns) => ({ key: String(columns), label: `columns ${columns}` }))}
      align="stretch"
      cell={(columns) => (
        <Grid columns={Number(columns)} gap="sm">
          <FileTiles count={Number(columns) * 2} />
        </Grid>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<GridArgs>;

const AutoFill = {
  name: 'Responsive auto-fill',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">minColWidth 160, resize the window to reflow</Text>
      <Grid minColWidth={160} gap="md">
        <FileTiles count={FILES.length} />
      </Grid>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<GridArgs>;

const NarrowBox = {
  name: 'One cell in a narrow box',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">minColWidth 240 in a 160 px box: the cell shrinks to the box</Text>
      <Box className="grid-demo__narrow">
        <Grid minColWidth={240} gap="sm">
          <FileTiles count={2} />
        </Grid>
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<GridArgs>;

const Dashboard = {
  name: 'Dashboard',
  render: () => (
    <Demonstrator
      rows={[{ key: 'wide', label: RUN_TEXT.wide }, { key: 'narrow', label: RUN_TEXT.narrow }]}
      align="stretch"
      cell={(width) => (
        <Box className={`grid-demo__dashboard grid-demo__dashboard--${width}`}>
          <RunDashboard />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<GridArgs>;

const Overview = overviewStory({
  component: 'Grid',
  description: 'Lays items out in equal columns, such as file tiles, cards or a gallery.',
  points: [
    '`columns` sets a fixed count.',
    '`minColWidth` fits as many columns of at least that width as the container allows.',
    'When both are set, `minColWidth` wins.',
    '`gap` takes a space token, and every div prop passes through.',
    '`Grid.Cell` with `span={2}` takes two columns once two fit, and `span="full"` the whole row.',
    '`dense` lets a later small cell fill the hole a wide one left, as on a dashboard of Cards.',
  ],
  instead: '[Flex] when the items have their own widths.',
  playground: Playground,
  variants: [FixedColumns, AutoFill, NarrowBox, Dashboard],
});

export default meta;
export { AutoFill, Dashboard, FixedColumns, NarrowBox, Overview, Playground };
