/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { PALETTES } from './colour-lists';
import type { Palette } from './colour-lists';
import { useSwatchHex } from './use-swatch-hex';
import './colours.css';

const Step = ({ token, step, isSeed }: { token: string; step: number; isSeed: boolean }) => {
  const { ref, hex } = useSwatchHex<HTMLElement>();
  return (
    <Box className={`palette-step${isSeed ? ' palette-step--seed' : ''}`}>
      <Box ref={ref} className="palette-step__chip" style={{ background: `var(${token})` }} />
      <Text className="palette-step__name">{isSeed ? `${step} seed` : step}</Text>
      <Text className="palette-step__value">{hex}</Text>
    </Box>
  );
};

const PaletteRow = ({ palette }: { palette: Palette }) => (
  <Box className="palette">
    <Box className="palette__head">
      <Text variant="subtitle">{palette.name}</Text>
      <Text className="palette__token">{`${palette.prefix}-*`}</Text>
    </Box>
    <Box className="palette__steps" style={{ gridTemplateColumns: `repeat(${palette.steps.length}, minmax(0, 1fr))` }}>
      {palette.steps.map((step) => (
        <Step key={step} token={`${palette.prefix}-${step}`} step={step} isSeed={step === palette.seed} />
      ))}
    </Box>
  </Box>
);

const meta = {
  title: 'Colours/Palettes',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Palettes = {
  name: 'Palettes',
  render: () => (
    <Box className="story-column colour-section">
      <Text className="story-label">
        The three main colours as twelve steps each, palest to deepest, with the colour at 500: paler steps mix toward pure white, deeper ones toward pure black. Then the greys from pure white to pure black. src/tokens/ramps.css.
      </Text>
      {PALETTES.map((palette) => <PaletteRow key={palette.prefix} palette={palette} />)}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

export default meta;
export { Palettes };
