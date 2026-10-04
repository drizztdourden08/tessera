/* @layer stories @kind component */
import { Box, Text } from '../../../src/primitives';
import { VariantGrid } from './VariantGrid';
import type { VariantGroupsProps } from './VariantGrid.type';

const VariantGroups = (props: VariantGroupsProps) => {
  const { groups, min, rowsOf } = props;
  return (
    <Box className="variant-groups">
      {groups.map((group) => (
        <Box key={group.key} className="variant-groups__group">
          <Text className="variant-groups__label">{group.label}</Text>
          <VariantGrid items={group.items} min={group.min ?? min} rowsOf={rowsOf} />
        </Box>
      ))}
    </Box>
  );
};

export { VariantGroups };
