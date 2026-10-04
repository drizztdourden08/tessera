/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, Card, SectionHeader, Stack, StatRow, Status } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type SectionHeaderArgs = {
  title: string;
  subtitle: string;
  showAction: boolean;
  count: number;
  level: 2 | 3 | 4;
};

const ARGS: Partial<SectionHeaderArgs> = { title: 'Save states', subtitle: 'Stored in this profile only', showAction: true, count: 3, level: 3 };

const ARG_TYPES: PlaygroundArgTypes<SectionHeaderArgs> = {
    title: { group: 'Content', control: 'text' },
    subtitle: { group: 'Content', control: 'text', description: 'Leave empty to hide.' },
    showAction: { group: 'Content', control: 'boolean' },
    count: { group: 'Content', control: 'number', min: -1, max: 120, step: 1, description: 'A Badge after the title; below 0 shows none.' },
    level: { group: 'Behaviour', control: 'select', options: [2, 3, 4], description: 'The heading level of the title, h3 by default.' },
  };

const meta = {
  title: 'Primitives · Display/SectionHeader',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SectionHeaderArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <SectionHeader
      title={args.title}
      subtitle={args.subtitle || undefined}
      count={args.count >= 0 ? args.count : undefined}
      level={args.level}
      action={args.showAction ? <Button size="sm" variant="secondary">New save</Button> : undefined}
    />
  ),
} satisfies PlaygroundStory<SectionHeaderArgs>;

const HEADERS: Readonly<Record<string, ReactNode>> = {
  'title only': <SectionHeader title="Audio" />,
  'title and subtitle': <SectionHeader title="Controller" subtitle="Applies to the active profile" />,
  'with a count': <SectionHeader title="Templates" count={3} />,
  'with a status': <SectionHeader title="Players" count={4} action={<Status tone="success">4 online</Status>} />,
  'with a button': (
    <SectionHeader
      title="Recent seeds"
      subtitle="The last ten you played"
      action={<Button size="sm" variant="ghost">Clear history</Button>}
    />
  ),
};

const Variants = {
  name: 'Variants',
  render: () => (
    <Demonstrator rows={axis(Object.keys(HEADERS))} align="stretch" cell={(kind) => HEADERS[kind]} />
  ),
} satisfies StoryLiteStoryDefinition<SectionHeaderArgs>;

const InAPanel = {
  name: 'Heading a settings panel',
  render: () => (
    <Box className="story-column">
      <Card>
        <Stack gap="sm">
          <SectionHeader
            title="Video"
            subtitle="Changes apply on the next frame"
            action={<Button size="sm" variant="ghost">Reset</Button>}
          />
          <StatRow label="Display scale" value="3x" />
          <StatRow label="Aspect ratio" value="4:3" />
          <StatRow label="Shader" value="None" />
        </Stack>
      </Card>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SectionHeaderArgs>;

const Overview = overviewStory({
  component: 'SectionHeader',
  description: 'The heading row of a section or a panel, with a title, an optional subtitle and an optional action.',
  points: [
    'Use it at the top of a settings group, a list or a card.',
    '`subtitle` sits beneath the title.',
    '`count` draws a [Badge] after the title, so the number is not part of the title text.',
    'The title is a heading, `h3` unless `level` says otherwise.',
    '`action` sits on the right and takes anything, most often a button or a [Status].',
  ],
  playground: Playground,
  variants: [Variants],
});

export default meta;
export { InAPanel, Overview, Playground, Variants };
