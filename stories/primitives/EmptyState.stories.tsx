/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { ReactNode } from 'react';
import { Button, Card, EmptyState, Glyph } from '../../src/primitives';
import type { GlyphName } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type EmptyStateArgs = {
  message: string;
  glyph: GlyphName | 'none';
  actionLabel: string;
};

const GLYPH_OPTIONS: readonly EmptyStateArgs['glyph'][] = ['none', 'box', 'gear', 'check', 'external'];

const ARGS: Partial<EmptyStateArgs> = { message: 'No save states yet. Press F1 in game to make one.', glyph: 'box', actionLabel: 'Import a save' };

const ARG_TYPES: PlaygroundArgTypes<EmptyStateArgs> = {
    message: { group: 'Content', control: 'text' },
    glyph: { group: 'Content', control: 'select', options: GLYPH_OPTIONS, optionView: (name) => (name === 'none' ? null : <Glyph name={name} size={16} />), description: 'Pick none to hide the icon.' },
    actionLabel: { group: 'Content', control: 'text', description: 'Leave empty to hide the action.' },
  };

const VARIANT_DEMOS: Record<string, ReactNode> = {
  'message only': <EmptyState message="Nothing matches this filter." />,
  'with icon': <EmptyState icon={<Glyph name="box" size={24} />} message="No rooms mapped in this dungeon." />,
  'with icon and action': (
    <EmptyState
      icon={<Glyph name="gear" size={24} />}
      message="No controller detected."
      action={<Button size="sm" variant="primary">Scan again</Button>}
    />
  ),
  'text icon': <EmptyState icon="0" message="No players have joined the session." />,
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
} satisfies PlaygroundStory<EmptyStateArgs>;

const Variants = {
  name: 'Variants',
  render: () => (
    <Demonstrator
      columns={axis(Object.keys(VARIANT_DEMOS))}
      fill
      align="stretch"
      valign="start"
      cell={(_row, variant) => <Card>{VARIANT_DEMOS[variant]}</Card>}
    />
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
