/* @layer renderer-components @kind component */
import '../../theme/focus-ring.css';
import { Box } from '../../primitives/Box';
import { useControlSize } from '../../primitives/field-control/useControlSize';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ANCHORS } from './AnchorPicker.constants';
import { useAnchorKeys } from './behavior/useAnchorKeys';
import { AnchorCell } from './sub-components/AnchorCell';
import type { AnchorPickerProps } from './AnchorPicker.type';
import './AnchorPicker.css';

const AnchorPicker = (props: AnchorPickerProps) => {
  const { value, onChange, variant = 'dots', size, label, disabled = false, className } = props;
  const { anchor: strings } = useTesseraStrings();
  const controlSize = useControlSize(size);
  const onKeyDown = useAnchorKeys(value, onChange);
  const classes = ['anchor-picker', `anchor-picker--${controlSize}`, disabled && 'anchor-picker--disabled', className].filter(Boolean).join(' ');

  return (
    <Box role="radiogroup" aria-label={label ?? strings.label} aria-disabled={disabled || undefined} className={classes} onKeyDown={disabled ? undefined : onKeyDown}>
      {ANCHORS.map((anchor) => (
        <AnchorCell key={anchor} anchor={anchor} value={value} variant={variant} disabled={disabled} onPick={onChange} />
      ))}
    </Box>
  );
};

export { AnchorPicker };
