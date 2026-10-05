/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { ReactNode } from 'react';
import { Button, Card, EmptyState, Glyph, Icon, Shortcut } from '../../src/primitives';
import type { IconName } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import './EmptyState.stories.css';

type EmptyStateArgs = {
  message: string;
  glyph: IconName | 'none';
  actionLabel: string;
};

const GLYPH_OPTIONS: readonly EmptyStateArgs['glyph'][] = ['none', 'package', 'settings', 'check', 'external-link'];

const ARGS: Partial<EmptyStateArgs> = { message: 'No save states yet. Press F1 in game to make one.', glyph: 'package', actionLabel: 'Import a save' };

const ARG_TYPES: PlaygroundArgTypes<EmptyStateArgs> = {
    message: { group: 'Content', control: 'text' },
    glyph: { group: 'Content', control: 'select', options: GLYPH_OPTIONS, optionView: (name) => (name === 'none' ? null : <Icon name={name} size={16} />), description: 'Pick none to hide the icon.' },
    actionLabel: { group: 'Content', control: 'text', description: 'Leave empty to hide the action.' },
  };

const VARIANT_DEMOS: Record<string, ReactNode> = {
  'message only': <EmptyState message="Nothing matches this filter." />,
  'with icon': <EmptyState icon={<Glyph name="box" size={24} />} message="No rooms mapped in this dungeon." />,
  'with icon and action': (
    <EmptyState
      icon={<Icon name="settings" size={24} />}
      message="No controller detected."
      action={<Button size="sm" variant="primary">Scan again</Button>}
    />
  ),
  'text icon': <EmptyState icon="0" message="No players have joined the session." />,
  'with title and hint': (
    <EmptyState
      icon={<Glyph name="box" size={24} />}
      title="No presets"
      message="A preset keeps the options of a game for the next session."
      action={<Button size="sm" variant="primary">New preset</Button>}
      hint={<>or press <Shortcut keys={['ctrl', 'N']} /></>}
    />
  ),
  small: <EmptyState size="sm" message="No hints yet." />,
};

const HeroDemo = () => (
  <Card className="empty-state-story__hero">
    <EmptyState
      size="hero"
      icon={<Glyph name="box" size={48} />}
      title="No session running"
      message="Start a session to host a multiworld for your friends."
      action={<Button variant="primary">New session</Button>}
      hint={<>Open a saved one with <Shortcut keys={['ctrl', 'O']} /></>}
    />
  </Card>
);

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
      icon={args.glyph === 'none' ? undefined : <Icon name={args.glyph} size={24} />}
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

const Hero = {
  name: 'A whole screen with nothing yet',
  render: () => <HeroDemo />,
} satisfies StoryLiteStoryDefinition<EmptyStateArgs>;

const Overview = overviewStory({
  component: 'EmptyState',
  description: 'What a list, a table or a panel shows when it has nothing in it yet.',
  points: [
    '`message` is the only required part; `title` sits above it in bold.',
    '`icon` sits on top, and `action` below the message: the next step, such as a button to import.',
    '`hint` is a quiet last line that can hold [Shortcut] keycaps.',
    '`size="sm"` fits a small panel; `size="hero"` fills a whole screen, centred.',
    'It centres the parts across its width and sets the message in muted text.',
  ],
  playground: Playground,
  variants: [Variants, Hero],
});

export default meta;
export { Hero, Overview, Playground, Variants };
