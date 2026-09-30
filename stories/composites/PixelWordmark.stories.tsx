/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { PixelWordmark } from '../../src/composites';
import type { PixelWordmarkColors, PixelWordmarkSize } from '../../src/composites';
import { BRAND_APPS, BRAND_FAMILY, BrandWordmark } from '../../src/brand';
import { Stack, Text } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type PixelWordmarkArgs = {
  text: string;
  top: string;
  upper: string;
  lower: string;
  bottom: string;
  size: PixelWordmarkSize;
};

const GOLD: PixelWordmarkColors = ['#ffe26e', '#ffd639', '#fcbb28', '#ffa200'];

const ARGS: Partial<PixelWordmarkArgs> = { text: 'Hello World', top: GOLD[0], upper: GOLD[1], lower: GOLD[2], bottom: GOLD[3], size: 'md' };

const ARG_TYPES: StoryLiteArgTypes<PixelWordmarkArgs> = {
  text: { control: 'text', description: 'Uppercase letters draw at capital size, lowercase smaller' },
  top: { control: 'color', description: 'Top band' },
  upper: { control: 'color' },
  lower: { control: 'color' },
  bottom: { control: 'color', description: 'Bottom band; the outline and shadow are drawn from it' },
  size: { control: 'select', options: ['sm', 'md', 'lg'] },
};

const meta = {
  title: 'Composites · Content/PixelWordmark',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PixelWordmarkArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <PixelWordmark
      text={args.text}
      colors={[args.top, args.upper, args.lower, args.bottom]}
      size={args.size}
    />
  ),
} satisfies StoryLiteStoryDefinition<PixelWordmarkArgs>;

const ALPHABET_UPPER = ['ABCDEFGHIJKLM', 'NOPQRSTUVWXYZ'];

const CASES = [
  { key: 'upper', label: 'Capitals' },
  { key: 'lower', label: 'Lowercase' },
] as const;

const Alphabet = {
  name: 'Alphabet',
  render: () => (
    <Demonstrator
      rows={CASES}
      cell={(letterCase) => (
        <Stack gap="md">
          {ALPHABET_UPPER.map((line) => (
            <PixelWordmark key={line} text={letterCase === 'upper' ? line : line.toLowerCase()} colors={GOLD} size="md" />
          ))}
        </Stack>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<PixelWordmarkArgs>;

const Brands = {
  name: 'Brand wordmarks',
  render: () => (
    <Stack gap="lg">
      {BRAND_APPS.map((app) => (
        <Stack key={app} gap="xs">
          <BrandWordmark app={app} size="md" />
          <Text variant="caption">{`text "${BRAND_FAMILY[app].wordmark.text}", colours ${BRAND_FAMILY[app].wordmark.colors.join(' ')}`}</Text>
        </Stack>
      ))}
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition<PixelWordmarkArgs>;

const Overview = overviewStory({
  component: 'PixelWordmark',
  description: 'A wordmark drawn in the pixel alphabet from a line of text and four gradient colours, top band to bottom. Reach for it for a title or an app name in the retro look. Capitals draw at full height and lowercase letters smaller, the outline and shadow come from the bottom colour, and every art pixel stays a crisp square at the sm, md and lg sizes. Each brand wordmark is one of these, set with its own text and colours.',
  playground: Playground,
  variants: [Alphabet, Brands],
});

export default meta;
export { Alphabet, Brands, Overview, Playground };
