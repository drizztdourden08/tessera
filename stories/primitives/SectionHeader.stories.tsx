/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Button, Card, SectionHeader, Stack, StatRow, Status } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type SectionHeaderArgs = {
  title: string;
  subtitle: string;
  showAction: boolean;
};

const ARGS: Partial<SectionHeaderArgs> = { title: 'Save states', subtitle: 'Stored in this profile only', showAction: true };

const ARG_TYPES: StoryLiteArgTypes<SectionHeaderArgs> = {
    title: { control: 'text' },
    subtitle: { control: 'text', description: 'Leave empty to hide.' },
    showAction: { control: 'boolean' },
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
      action={args.showAction ? <Button size="sm" variant="secondary">New save</Button> : undefined}
    />
  ),
} satisfies StoryLiteStoryDefinition<SectionHeaderArgs>;

const HEADERS: Readonly<Record<string, ReactNode>> = {
  'title only': <SectionHeader title="Audio" />,
  'title and subtitle': <SectionHeader title="Controller" subtitle="Applies to the active profile" />,
  'with a count': <SectionHeader title="Players" action={<Status tone="success">4 online</Status>} />,
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
  description: 'The heading row of a section or a panel: a title, an optional subtitle beneath it, and an optional action on the right. Reach for it at the top of a settings group, a list or a card. The action slot takes anything, most often a button, a Status or a count.',
  playground: Playground,
  variants: [Variants],
});

export default meta;
export { InAPanel, Overview, Playground, Variants };
