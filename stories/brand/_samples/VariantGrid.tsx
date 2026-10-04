/* @layer stories @kind component */
import { Box, Text } from '../../../src/primitives';
import type { VariantGridProps } from './VariantGrid.type';
import './VariantGrid.css';

const VariantGrid = (props: VariantGridProps) => {
  const { items, min = 'sm', rowsOf } = props;
  return (
    <Box className="variant-grid" data-min={min} data-rows-of={rowsOf}>
      {items.map((item) => (
        <Box key={item.key} className="variant-grid__cell">
          <Box className="variant-grid__art" data-ground={item.ground}>{item.node}</Box>
          <Text className="variant-grid__label">{item.label}</Text>
        </Box>
      ))}
    </Box>
  );
};

export { VariantGrid };
