/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { PALETTES } from './colour-lists';
import type { Palette } from './colour-lists';
import { useSwatchHex } from './use-swatch-hex';
import './colours.css';

interface StepProps {
  token: string;
  step: number;
  column: number;
  isSeed: boolean;
}

const Step = ({ token, step, column, isSeed }: StepProps) => {
  const { ref, hex } = useSwatchHex<HTMLElement>();
  return (
    <>
      <Box
        ref={ref}
        className={`palette-strip__chip${isSeed ? ' palette-strip__chip--seed' : ''}`}
        style={{ background: `var(${token})`, gridColumn: column }}
      />
      <Box className="palette-strip__label" style={{ gridColumn: column }}>
        <Text className="palette-strip__step">{isSeed ? `${step} seed` : step}</Text>
        <Text className="palette-strip__value">{hex}</Text>
      </Box>
    </>
  );
};

const PaletteStrip = ({ palette }: { palette: Palette }) => (
  <Box className="palette-strip" style={{ gridTemplateColumns: `repeat(${palette.steps.length}, minmax(0, 1fr))` }}>
    {palette.steps.map((step, index) => (
      <Step key={step} token={`${palette.prefix}-${step}`} step={step} column={index + 1} isSeed={step === palette.seed} />
    ))}
  </Box>
);

const PaletteStrips = ({ palettes }: { palettes: readonly Palette[] }) => (
  <Demonstrator
    rows={palettes.map((palette) => ({ key: palette.prefix, label: `${palette.name} ${palette.prefix}-*` }))}
    align="stretch"
    cell={(prefix) => {
      const palette = palettes.find((entry) => entry.prefix === prefix);
      return palette ? <PaletteStrip palette={palette} /> : null;
    }}
  />
);

const meta = {
  title: 'Core · Colours/Palettes',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Palettes = {
  name: 'Palettes',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">
        The three main colours as twelve steps each, palest to deepest, with the colour at 500: paler steps mix toward pure white, deeper ones toward pure black. Then the greys from pure white to pure black.
      </Text>
      <PaletteStrips palettes={PALETTES} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Palettes',
  description: 'The three accents as twelve steps each, palest to deepest with the accent itself at 500, then the greys from pure white to pure black. Each palette is one continuous strip, its step and value under each colour. Paler steps mix toward pure white and deeper ones toward pure black.',
  variants: [Palettes],
});

export default meta;
export { Overview, Palettes };
