/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { FONTS, PANGRAM } from './type-lists';
import { TypeTable } from './TypeTable';
import './faces.css';

const TITLE_WEIGHTS = [400, 500, 600, 700] as const;
const ADDED_GAME_GLYPHS = '# $ % & * + / ; = @ [ \\ ] ^ _ ` { } ~';

const meta = {
  title: 'Typography/Fonts',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Fonts = {
  name: 'Fonts',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">The font stacks. Every face ships with Tessera, so nothing is fetched from the network.</Text>
      <TypeTable entries={FONTS} property="fontFamily" specimen={PANGRAM} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const TitleFace = {
  name: 'Title face',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Chakra Petch, --font-title. Cut corners and square counters for titles and headings, in four weights with italics.</Text>
      <Box className="title-face">
        <Text className="title-face__display">Archipelia</Text>
        <Text className="title-face__heading">Session setup</Text>
        <Text className="title-face__caps">Hyrule Castle 112 / 216</Text>
        <Demonstrator
          className="title-face__weights"
          rows={axis(TITLE_WEIGHTS.map(String))}
          cell={(weight) => (
            <Text className="title-face__heading" weight={Number(weight)}>
              Multiworld <Text weight={Number(weight)} italic>Multiworld</Text>
            </Text>
          )}
        />
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const GameFace = {
  name: 'Game face',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">
        --font-game, the dialogue face modified for Relic of the Past: the 19 symbols on the second line were added on the face's own pixel grid. Shown at 16 and 32 pixels, whole multiples of its design size.
      </Text>
      <Box className="game-face">
        <Text className="game-face__line">It's dangerous to go alone!</Text>
        <Text className="game-face__line">{ADDED_GAME_GLYPHS}</Text>
        <Text className="game-face__line game-face__line--small">Take this. 100% of 216 checks @ Hyrule [Castle] + 3 keys = done; ~5 min</Text>
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Fonts',
  description: 'Every face Tessera sets text in, all shipped with Tessera so nothing is fetched from the network. Inter (--font-sans) sets running text and controls, Chakra Petch (--font-title) sets titles and headings, and --font-mono and --font-game cover code and the game\'s dialogue face.',
  variants: [Fonts, TitleFace, GameFace],
});

export default meta;
export { Fonts, GameFace, Overview, TitleFace };
