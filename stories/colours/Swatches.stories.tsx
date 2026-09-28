/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { MAIN_SWATCHES, SWATCH_GROUPS } from './colour-lists';
import type { MainSwatch } from './colour-lists';
import { useSwatchHex } from './use-swatch-hex';
import './colours.css';

const SwatchCard = ({ swatch }: { swatch: MainSwatch }) => {
  const { ref, hex } = useSwatchHex<HTMLElement>();
  return (
    <Box className="main-swatch">
      <Box ref={ref} className="main-swatch__chip" style={{ background: `var(${swatch.token})`, color: `var(${swatch.on})` }}>
        <Text className="main-swatch__ink">Aa</Text>
      </Box>
      <Box className="main-swatch__label">
        <Text className="main-swatch__name">{swatch.name}</Text>
        <Text className="main-swatch__value">{hex}</Text>
        <Text className="main-swatch__token">{swatch.token}</Text>
        <Text className="main-swatch__use">{swatch.use}</Text>
      </Box>
    </Box>
  );
};

const meta = {
  title: 'Colours/Swatches',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Swatches = {
  name: 'Swatches',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">
        The only place a colour value is written: the three accents, the whites and blacks, the urgency colours and ten tag colours. Only the three accents have palettes. Every palette and role is derived from these. They follow the look picked at the top of the menu.
      </Text>
      {SWATCH_GROUPS.map((group) => (
        <Box key={group} className="story-column">
          <Text variant="subtitle">{group}</Text>
          <Box className="main-swatches">
            {MAIN_SWATCHES.filter((swatch) => swatch.group === group).map((swatch) => <SwatchCard key={swatch.token} swatch={swatch} />)}
          </Box>
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Swatches',
  description: 'The only place a colour value is written: the three accents, the whites and blacks, the urgency colours and ten tag colours. Every palette and role is derived from these, and they follow the look picked at the top of the menu.',
  variants: [Swatches],
});

export default meta;
export { Overview, Swatches };
