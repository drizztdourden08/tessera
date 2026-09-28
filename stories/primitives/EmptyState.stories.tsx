/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Button, Card, EmptyState, Glyph, Grid, Text } from '../../src/primitives';
import type { GlyphName } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type EmptyStateArgs = {
  message: string;
  glyph: GlyphName | 'none';
  actionLabel: string;
};

const GLYPH_OPTIONS: readonly EmptyStateArgs['glyph'][] = ['none', 'box', 'gear', 'check', 'external'];

const ARGS: Partial<EmptyStateArgs> = { message: 'No save states yet. Press F1 in game to make one.', glyph: 'box', actionLabel: 'Import a save' };

const ARG_TYPES: StoryLiteArgTypes<EmptyStateArgs> = {
    message: { control: 'text' },
    glyph: { control: 'select', options: GLYPH_OPTIONS, description: 'Pick none to hide the icon.' },
    actionLabel: { control: 'text', description: 'Leave empty to hide the action.' },
  };

const meta = {
  title: 'Primitives · Display/EmptyState',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<EmptyStateArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <EmptyState
      message={args.message}
      icon={args.glyph === 'none' ? undefined : <Glyph name={args.glyph} size={24} />}
      action={args.actionLabel ? <Button size="sm" variant="secondary">{args.actionLabel}</Button> : undefined}
    />
  ),
} satisfies StoryLiteStoryDefinition<EmptyStateArgs>;

const Variants = {
  name: 'Variants',
  render: () => (
    <Grid minColWidth={220} gap="md">
      <Card>
        <Text className="story-label">message only</Text>
        <EmptyState message="Nothing matches this filter." />
      </Card>
      <Card>
        <Text className="story-label">with icon</Text>
        <EmptyState icon={<Glyph name="box" size={24} />} message="No rooms mapped in this dungeon." />
      </Card>
      <Card>
        <Text className="story-label">with icon and action</Text>
        <EmptyState
          icon={<Glyph name="gear" size={24} />}
          message="No controller detected."
          action={<Button size="sm" variant="primary">Scan again</Button>}
        />
      </Card>
      <Card>
        <Text className="story-label">text icon</Text>
        <EmptyState icon="0" message="No players have joined the session." />
      </Card>
    </Grid>
  ),
} satisfies StoryLiteStoryDefinition<EmptyStateArgs>;

const Overview = overviewStory({
  component: 'EmptyState',
  description: 'What a list, a table or a panel shows when it has nothing in it yet. The message is the only required part; an icon above it and an action below it, such as a button to import or to scan again, are both optional. It stacks the three parts, centres them across its width, and sets the message in small muted text.',
  playground: Playground,
  variants: [Variants],
});

export default meta;
export { Overview, Playground, Variants };
