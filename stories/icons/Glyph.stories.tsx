/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Glyph, GLYPHS, Text } from '../../src/primitives';
import type { GlyphName } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './icons.stories.css';

type GlyphArgs = {
  name: GlyphName;
  size: number;
};

const NAMES = Object.keys(GLYPHS) as GlyphName[];

const ARG_TYPES: PlaygroundArgTypes<GlyphArgs> = {
  name: { group: 'Content', control: 'select', options: NAMES, optionView: (name) => <Glyph name={name} size={16} /> },
  size: { group: 'Appearance', control: 'number' },
};

const meta = {
  title: 'Core · Icons/Glyph',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<GlyphArgs>;

const Playground = {
  name: 'Playground',
  args: { name: 'chevronRight', size: 24 },
  argTypes: ARG_TYPES,
  render: (args) => <Glyph name={args.name} size={args.size} />,
} satisfies PlaygroundStory<GlyphArgs>;

const Set = {
  name: 'The set',
  render: () => (
    <Box className="icon-gallery__grid">
      {NAMES.map((name) => (
        <Box key={name} className="icon-gallery__cell">
          <Glyph name={name} size={20} />
          <Text className="icon-gallery__name">{name}</Text>
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<GlyphArgs>;

const Overview = overviewStory({
  component: 'Glyph',
  description: 'The small stroke glyphs the components draw themselves: chevrons, check, close, sort arrows, the gear. They sit on a 16-unit grid with a 1.5 stroke in currentColor, sized to sit beside dense UI text. For anything an app draws, use Icon with a name.',
  playground: Playground,
  variants: [Set],
});

export default meta;
export { Overview, Playground, Set };
