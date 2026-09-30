/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Grid, Stack, Text } from '../../src/primitives';
import type { SpaceToken } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import './Grid.stories.css';

type GridArgs = {
  columns: number;
  minColWidth: number;
  gap: SpaceToken;
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

const ARGS: Partial<GridArgs> = { columns: 3, minColWidth: 0, gap: 'sm', count: 8 };

const ARG_TYPES: StoryLiteArgTypes<GridArgs> = {
    columns: { control: 'number', description: 'Fixed column count.' },
    minColWidth: { control: 'number', description: 'Auto-fill minimum width in px. 0 turns it off.' },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    count: { control: 'number' },
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
    <Grid columns={args.columns || undefined} minColWidth={args.minColWidth || undefined} gap={args.gap}>
      <FileTiles count={args.count} />
    </Grid>
  ),
} satisfies StoryLiteStoryDefinition<GridArgs>;

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

const Overview = overviewStory({
  component: 'Grid',
  description: 'Lays items out in equal columns: file tiles, cards, a gallery. Columns sets a fixed count. MinColWidth makes it responsive instead: it fits as many columns of at least that width as the container allows, and wins when both are set. The gap takes a space token, and every div prop passes through.',
  playground: Playground,
  variants: [FixedColumns, AutoFill],
});

export default meta;
export { AutoFill, FixedColumns, Overview, Playground };
