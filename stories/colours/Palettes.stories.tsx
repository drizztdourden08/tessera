/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { PALETTES } from './colour-lists';
import type { Palette } from './colour-lists';
import { useSwatchHex } from './use-swatch-hex';
import './colours.css';

const Step = ({ token, isSeed }: { token: string; isSeed: boolean }) => {
  const { ref, hex } = useSwatchHex<HTMLElement>();
  return (
    <Box className={`palette-step${isSeed ? ' palette-step--seed' : ''}`}>
      <Box ref={ref} className="palette-step__chip" style={{ background: `var(${token})` }} />
      {isSeed && <Text className="palette-step__name">seed</Text>}
      <Text className="palette-step__value">{hex}</Text>
    </Box>
  );
};

const PaletteGrid = ({ palettes }: { palettes: readonly Palette[] }) => (
  <Demonstrator
    rows={palettes.map((palette) => ({ key: palette.prefix, label: `${palette.name} ${palette.prefix}-*` }))}
    columns={axis(palettes[0]?.steps.map(String) ?? [])}
    fill
    align="stretch"
    cell={(prefix, step) => {
      const palette = palettes.find((entry) => entry.prefix === prefix);
      return <Step token={`${prefix}-${step}`} isSeed={palette?.seed === Number(step)} />;
    }}
  />
);

const meta = {
  title: 'Colours/Palettes',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Palettes = {
  name: 'Palettes',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">
        The three main colours as twelve steps each, palest to deepest, with the colour at 500: paler steps mix toward pure white, deeper ones toward pure black. Then the greys from pure white to pure black.
      </Text>
      <PaletteGrid palettes={PALETTES.filter((palette) => palette.seed !== null)} />
      <PaletteGrid palettes={PALETTES.filter((palette) => palette.seed === null)} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Palettes',
  description: 'The three accents as twelve steps each, palest to deepest with the accent itself at 500, then the greys from pure white to pure black. Paler steps mix toward pure white and deeper ones toward pure black.',
  variants: [Palettes],
});

export default meta;
export { Overview, Palettes };
