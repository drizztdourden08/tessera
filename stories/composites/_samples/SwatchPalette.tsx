/* @layer stories @kind component */
import { SwatchGrid } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { SWATCH_SETS } from './swatch-story.constants';
import type { SwatchPaletteProps } from './swatch-story.type';
import { swatchSummary } from './swatch-summary';
import { useSwatchPalette } from './useSwatchPalette';

const SwatchPalette = ({ palette = 'sixteen', size, showIndex = true, columns, tall = false, startRange }: SwatchPaletteProps) => {
  const { colors, selectedId, secondaryId, range, select, selectSecondary, changeRange, move } = useSwatchPalette(SWATCH_SETS[palette], startRange);
  return (
    <Box className="swatch-story__frame">
      <Box className={tall ? 'swatch-story__scroll' : undefined}>
        <SwatchGrid
          label="Palette"
          colors={colors}
          size={size}
          columns={columns}
          showIndex={showIndex}
          selectedId={selectedId}
          secondaryId={secondaryId}
          range={range}
          onSelect={select}
          onSecondarySelect={selectSecondary}
          onRangeChange={changeRange}
          onMove={move}
          empty="No colours yet."
        />
      </Box>
      <Text variant="caption" tone="muted">{swatchSummary(colors, selectedId, secondaryId, range)}</Text>
    </Box>
  );
};

export { SwatchPalette };
