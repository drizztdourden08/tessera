/* @layer renderer-components @kind component */
import '../../theme/focus-ring.css';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ANCHORS } from './AnchorPicker.constants';
import { anchorPickerClass } from './behavior/anchor-picker-class';
import { useAnchorKeys } from './behavior/useAnchorKeys';
import { useShownSize } from './behavior/useShownSize';
import { AnchorCell } from './sub-components/AnchorCell';
import type { AnchorPickerProps } from './AnchorPicker.type';
import './AnchorPicker.css';

const AnchorPicker = (props: AnchorPickerProps) => {
  const { value, onChange, variant = 'dots', size, label, customLabel, disabled = false, className } = props;
  const { anchor: strings } = useTesseraStrings();
  const shown = useShownSize(size);
  const custom = value === 'custom';
  const onKeyDown = useAnchorKeys(value, onChange);
  const classes = anchorPickerClass(shown, disabled, className);

  return (
    <Box
      role="radiogroup"
      aria-label={label ?? strings.label}
      aria-description={custom ? customLabel : undefined}
      aria-disabled={disabled || undefined}
      data-custom={custom || undefined}
      className={classes}
      onKeyDown={disabled ? undefined : onKeyDown}
    >
      {ANCHORS.map((anchor) => (
        <AnchorCell key={anchor} anchor={anchor} value={value} variant={variant} size={shown} disabled={disabled} onPick={onChange} />
      ))}
    </Box>
  );
};

export { AnchorPicker };
