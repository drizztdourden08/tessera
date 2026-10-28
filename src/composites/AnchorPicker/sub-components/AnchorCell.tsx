/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { arrowAway } from '../behavior/arrow-away';
import { ARROW_SIZE, ARROW_SIZE_XS } from '../AnchorPicker.constants';
import type { AnchorCellProps } from '../AnchorPicker.type';

const AnchorCell = (props: AnchorCellProps) => {
  const { anchor, value, variant, size, disabled, onPick } = props;
  const { anchor: strings } = useTesseraStrings();
  const checked = anchor === value;
  const arrow = variant === 'arrows' && !checked && value !== 'custom' ? arrowAway(value, anchor) : null;
  const stop = value === 'custom' ? anchor === 'center' : checked;

  return (
    <Pressable
      role="radio"
      aria-checked={checked}
      aria-label={strings.names[anchor]}
      data-anchor={anchor}
      tabIndex={stop ? 0 : -1}
      disabled={disabled}
      className="anchor-picker__cell focus-ring-inset"
      onClick={() => onPick(anchor)}
    >
      {arrow === null
        ? <Box as="span" className="anchor-picker__dot" aria-hidden="true" />
        : <Icon name="arrow-up" size={size === 'xs' ? ARROW_SIZE_XS : ARROW_SIZE} className="anchor-picker__arrow" data-direction={arrow} />}
    </Pressable>
  );
};

export { AnchorCell };
