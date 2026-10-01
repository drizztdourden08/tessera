/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { Span } from '../../../primitives/text-elements';
import { ColorSwatch } from '../../../primitives/ColorSwatch';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { QuickAssignProps } from './QuickAssign.type';

const QuickAssign = ({ value, onChange, swatchGroups }: QuickAssignProps) => {
  const { colorPicker } = useTesseraStrings();
  if (!swatchGroups || swatchGroups.length === 0) return null;
  const current = value.toLowerCase();

  return (
    <Box className="color-picker__quick-assign-section">
      <Text variant="subtitle" className="color-picker__title">{colorPicker.quickAssign}</Text>
      <Box className="color-picker__quick-assign">
        {swatchGroups.map((group) => (
          <Box key={group.label} className="color-picker__quick-group">
            <Span tone="muted" className="color-picker__quick-label">{group.label}</Span>
            <Box className="color-picker__quick-swatches">
              {group.colors.map((hex, i) => (
                <ColorSwatch
                  key={`${hex}-${i}`}
                  color={hex}
                  className="color-picker__quick-swatch"
                  title={hex}
                  selected={hex.toLowerCase() === current}
                  onClick={() => onChange(hex)}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { QuickAssign };
