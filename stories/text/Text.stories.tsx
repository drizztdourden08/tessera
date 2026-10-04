/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Stack, TEXT_ELEMENT_SPECS, Text } from '../../src/primitives';
import type { TextVariant } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type TextVariantChoice = TextVariant | 'none';
type TextElement = 'span' | 'p' | 'div' | 'h2' | 'h3' | 'strong' | 'label';

type TextArgs = {
  text: string;
  variant: TextVariantChoice;
  as: TextElement;
  weight: number;
  italic: boolean;
};

type Member = { name: string; short: string; renders: string };

const VARIANTS: readonly TextVariant[] = ['title', 'subtitle', 'body', 'label', 'caption'];

const SAMPLES: Record<TextVariant, string> = {
  title: 'Multiworld session',
  subtitle: 'Four players, started 40 minutes ago',
  body: 'Items found in your world are sent to their owner as soon as you pick them up.',
  label: 'Connection',
  caption: 'Last synced 12 seconds ago',
};

const EXTRA_MEMBERS: readonly Member[] = [
  { name: 'Shortcut', short: 'Sc', renders: 'keycaps' },
  { name: 'Quote', short: 'Q', renders: '<q> or <blockquote>' },
  { name: 'CodeBlock', short: 'CodeBlock', renders: 'a code panel' },
];

const MEMBERS: readonly Member[] = [
  ...TEXT_ELEMENT_SPECS.map((spec) => ({ name: spec.name, short: spec.short, renders: `<${spec.tag}>` })),
  ...EXTRA_MEMBERS,
];

const ARGS: Partial<TextArgs> = { text: 'Items found in your world are sent to their owner.', variant: 'body', as: 'p', weight: 400, italic: false };

const ARG_TYPES: PlaygroundArgTypes<TextArgs> = {
  text: { group: 'Content', control: 'text' },
  variant: { group: 'Appearance', control: 'select', options: ['none', ...VARIANTS] },
  weight: { group: 'Appearance', control: 'range', min: 100, max: 900, step: 1, description: 'Any whole number from 100 to 900.' },
  italic: { group: 'Appearance', control: 'boolean' },
  as: { group: 'Behaviour', control: 'select', options: ['span', 'p', 'div', 'h2', 'h3', 'strong', 'label'] },
};

const meta = {
  title: 'Core · Text/Text',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TextArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Text
      as={args.as}
      variant={args.variant === 'none' ? undefined : args.variant}
      weight={args.weight === 400 ? undefined : args.weight}
      italic={args.italic || undefined}
    >
      {args.text}
    </Text>
  ),
} satisfies PlaygroundStory<TextArgs>;

const Passage = {
  name: 'A passage from dot members',
  render: () => (
    <Box className="story-column">
      <Text.P>
        <Text.Strong>Wren</Text.Strong> sent the <Text.Em>Hookshot</Text.Em> to Tavi at <Text.Time dateTime="12:40">12:40</Text.Time>,
        and <Text.Mark>two players</Text.Mark> are still in the Dark World. Press <Text.Sc keys={['ctrl', 'S']} /> to
        save, or type <Text.Code>/release</Text.Code> in the <Text.Abbr title="Archipelago">AP</Text.Abbr> console
        to send the rest. The old seed is <Text.Del>closed</Text.Del> <Text.Ins>archived</Text.Ins>.
      </Text.P>
      <Text.Quote>It is dangerous to go alone.</Text.Quote>
      <Text.CodeBlock code={'const hero = \'Link\';'} language="typescript" />
      <Text.Small tone="muted">Every piece of this passage is a member of Text.</Text.Small>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TextArgs>;

const Members = {
  name: 'Every member',
  render: () => (
    <Demonstrator
      rows={MEMBERS.map((member) => ({ key: member.name, label: member.renders }))}
      cell={(name) => {
        const short = MEMBERS.find((member) => member.name === name)?.short ?? name;
        return (
          <Box className="story-inline">
            <Text.Code>{`Text.${name}`}</Text.Code>
            {short !== name && <Text.Code>{`Text.${short}`}</Text.Code>}
          </Box>
        );
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<TextArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Demonstrator
      rows={axis<TextVariant | 'none'>([...VARIANTS, 'none'])}
      cell={(variant) => (variant === 'none'
        ? <Text>Plain text with no variant inherits the base size and colour.</Text>
        : <Text variant={variant}>{SAMPLES[variant]}</Text>)}
    />
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
  description: 'The namespace for every text element, and on its own a plain text element for interface copy.',
  points: [
    'Every element hangs off it by full and short name, such as `Text.P`, `Text.Strong` or `Text.Sc`.',
    '`variant` picks a role: `title`, `subtitle`, `body`, `label` or `caption`.',
    'With no `variant` it takes the size and colour of its parent.',
    '`as` swaps the default `<span>` for another element, such as `p` or `label`.',
    '`weight` and `italic` set the face.',
  ],
  instead: '[Title] for headings.',
  playground: Playground,
  variants: [Passage, Members, AllVariants, Composed],
});

export default meta;
export { AllVariants, Composed, Members, Overview, Passage, Playground };
