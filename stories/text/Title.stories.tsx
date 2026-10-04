/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { HEADING_LEVELS, TITLE_TONES, Title } from '../../src/primitives';
import type { HeadingLevel, TitleTone } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { tonesStory } from './tones-story';

type TitleArgs = {
  level: HeadingLevel;
  text: string;
  tone: TitleTone | 'none';
  weight: number;
  italic: boolean;
};

const ARG_TYPES: PlaygroundArgTypes<TitleArgs> = {
  text: { group: 'Content', control: 'text' },
  tone: { group: 'Appearance', control: 'select', options: ['none', ...TITLE_TONES], description: 'A colour from the theme roles.' },
  weight: { group: 'Appearance', control: 'range', min: 100, max: 900, step: 1, description: 'Any whole number from 100 to 900. The title face snaps to its nearest cut.' },
  italic: { group: 'Appearance', control: 'boolean' },
  level: { group: 'Behaviour', control: 'select', options: [...HEADING_LEVELS] },
};

const meta = {
  title: 'Core · Text/Title',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TitleArgs>;

const Playground = {
  name: 'Playground',
  args: { level: 1, text: 'Hyrule Castle', tone: 'none', weight: 600, italic: false },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Title level={Number(args.level) as HeadingLevel} tone={args.tone === 'none' ? undefined : args.tone} weight={args.weight === 600 ? undefined : args.weight} italic={args.italic || undefined}>
      {args.text}
    </Title>
  ),
} satisfies PlaygroundStory<TitleArgs>;

const Levels = {
  name: 'Levels',
  render: () => (
    <Demonstrator
      rows={HEADING_LEVELS.map((level) => ({ key: `H${level}` as const, label: `Title.H${level}` }))}
      cell={(heading) => {
        const Heading = Title[heading];
        return <Heading>Hyrule Castle</Heading>;
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<TitleArgs>;

const Tones = tonesStory(Title.H3, 'Hyrule Castle', TITLE_TONES);

const Overview = overviewStory({
  component: 'Title',
  description: 'Headings in Chakra Petch, the title face, from H1 at display size down to H6. H1 to H3 are set in capitals. Title takes a level; Title.H1 to Title.H6 and Title.Heading1 to Title.Heading6 are the same headings by name, and H1 or Heading1 import on their own. Headings take a weight, italic, a quiet or accent tone, and the native attributes of their tag.',
  playground: Playground,
  variants: [Levels, Tones],
});

export default meta;
export { Levels, Overview, Playground, Tones };
