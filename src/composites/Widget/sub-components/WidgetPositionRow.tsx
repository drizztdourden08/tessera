/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { SegmentedControl } from '../../../primitives/SegmentedControl';
import { Span } from '../../../primitives/text-elements';
import { POSITION_OPTIONS } from '../Widget.constants';
import type { PositionValue, WidgetPositionRowProps } from './WidgetPositionRow.type';

const WidgetPositionRow = (props: WidgetPositionRowProps) => {
  const { widget, onChange, onClose } = props;
  const posValue: PositionValue = widget.mode === 'floating' ? 'float' : widget.side;
  const options = POSITION_OPTIONS.map(({ value, icon, title }) => ({ value, title, label: <Icon name={icon} size={14} /> }));

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
      <Span tone="dim" className="widget-settings__label">Position</Span>
      <SegmentedControl value={posValue} options={options} onChange={handleChange} />
    </Box>
  );
};

export { WidgetPositionRow };
