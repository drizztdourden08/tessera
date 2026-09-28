/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Stack, Text } from '../../src/primitives';
import type { TextVariant } from '../../src/primitives';
import { LabelledRows } from '../_template/LabelledRows';
import { overviewStory } from '../_template/overview-story';

type TextVariantChoice = TextVariant | 'none';
type TextElement = 'span' | 'p' | 'div' | 'h2' | 'h3' | 'strong' | 'label';

type TextArgs = {
  text: string;
  variant: TextVariantChoice;
  as: TextElement;
};

const VARIANTS: readonly TextVariant[] = ['title', 'subtitle', 'body', 'label', 'caption'];

const SAMPLES: Record<TextVariant, string> = {
  title: 'Multiworld session',
  subtitle: 'Four players, started 40 minutes ago',
  body: 'Items found in your world are sent to their owner as soon as you pick them up.',
  label: 'Connection',
  caption: 'Last synced 12 seconds ago',
};

const ARGS: Partial<TextArgs> = { text: 'Items found in your world are sent to their owner.', variant: 'body', as: 'p' };

const ARG_TYPES: StoryLiteArgTypes<TextArgs> = {
    text: { control: 'text' },
    variant: { control: 'select', options: ['none', ...VARIANTS] },
    as: { control: 'select', options: ['span', 'p', 'div', 'h2', 'h3', 'strong', 'label'] },
  };

const meta = {
  title: 'Primitives · Display/Text',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TextArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Text as={args.as} variant={args.variant === 'none' ? undefined : args.variant}>
      {args.text}
    </Text>
  ),
} satisfies StoryLiteStoryDefinition<TextArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <LabelledRows items={VARIANTS} render={(variant) => <Text variant={variant}>{SAMPLES[variant]}</Text>}>
      <Box className="story-row">
        <Text className="story-label">none</Text>
        <Text>Plain text with no variant inherits the base size and colour.</Text>
      </Box>
    </LabelledRows>
  ),
} satisfies StoryLiteStoryDefinition<TextArgs>;

const Composed = {
  name: 'Composed block',
  render: () => (
    <Stack gap="xs">
      <Text variant="label">Connection</Text>
      <Text as="h2" variant="title">{SAMPLES.title}</Text>
      <Text as="p" variant="subtitle">{SAMPLES.subtitle}</Text>
      <Text as="p" variant="body">{SAMPLES.body}</Text>
      <Text variant="caption">{SAMPLES.caption}</Text>
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition<TextArgs>;

const Overview = overviewStory({
  component: 'Text',
  description: 'The element for every piece of text in the interface, in place of a raw span, p or heading. Pick a variant for its role: title, subtitle, body, label or caption. With no variant it takes the base size and colour of its parent. It renders a span by default, and as swaps in any other element, such as p, h2 or label.',
  playground: Playground,
  variants: [AllVariants],
});

export default meta;
export { AllVariants, Composed, Overview, Playground };
