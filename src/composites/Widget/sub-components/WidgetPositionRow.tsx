/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { SegmentedControl } from '../../../primitives/SegmentedControl';
import { Text } from '../../../primitives/Text';
import { POSITION_OPTIONS } from '../Widget.constants';
import type { PositionValue, WidgetPositionRowProps } from './WidgetPositionRow.type';

const WidgetPositionRow = (props: WidgetPositionRowProps) => {
  const { widget, onChange, onClose } = props;
  const posValue: PositionValue = widget.mode === 'floating' ? 'float' : widget.side;

  const handleChange = (v: PositionValue) => {
    if (v === 'float') {
      onChange({ mode: 'floating' });
    } else {
      onChange({ mode: 'docked', side: v });
    }
    onClose();
  };

  return (
    <Box className="widget-settings__row">
      <Text className="widget-settings__label">Position</Text>
      <SegmentedControl value={posValue} options={POSITION_OPTIONS} onChange={handleChange} />
    </Box>
  );
};

export { WidgetPositionRow };
