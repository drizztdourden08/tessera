/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, HEADING_LEVELS, Text, Title } from '../../src/primitives';
import type { HeadingLevel } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type TitleArgs = {
  level: HeadingLevel;
  text: string;
  weight: number;
  italic: boolean;
};

const ARG_TYPES: StoryLiteArgTypes<TitleArgs> = {
  level: { control: 'select', options: [...HEADING_LEVELS] },
  text: { control: 'text' },
  weight: { control: 'number', description: 'Any whole number from 100 to 900. The title face snaps to its nearest cut.' },
  italic: { control: 'boolean' },
};

const meta = {
  title: 'Text/Title',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TitleArgs>;

const Playground = {
  name: 'Playground',
  args: { level: 1, text: 'Hyrule Castle', weight: 600, italic: false },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Title level={Number(args.level) as HeadingLevel} weight={args.weight === 600 ? undefined : args.weight} italic={args.italic || undefined}>
      {args.text}
    </Title>
  ),
} satisfies StoryLiteStoryDefinition<TitleArgs>;

const Levels = {
  name: 'Levels',
  render: () => (
    <Box className="story-list">
      {HEADING_LEVELS.map((level) => {
        const Heading = Title[`H${level}`];
        return (
          <Box key={level} className="story-list__item">
            <Text className="story-label">{`Title.H${level}`}</Text>
            <Heading>Hyrule Castle</Heading>
          </Box>
        );
      })}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TitleArgs>;

const Overview = overviewStory({
  component: 'Title',
  description: 'Headings in Chakra Petch, the title face, from H1 at display size down to H6 in small capitals. Title takes a level; Title.H1 to Title.H6 and Title.Heading1 to Title.Heading6 are the same headings by name, and H1 or Heading1 import on their own. Every heading takes the typesetting props of Text and the native attributes of its tag.',
  playground: Playground,
  variants: [Levels],
});

export default meta;
export { Levels, Overview, Playground };
