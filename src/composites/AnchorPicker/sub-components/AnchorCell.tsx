/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { arrowAway } from '../behavior/arrow-away';
import type { AnchorCellProps } from '../AnchorPicker.type';

const AnchorCell = (props: AnchorCellProps) => {
  const { anchor, value, variant, disabled, onPick } = props;
  const { anchor: strings } = useTesseraStrings();
  const checked = anchor === value;
  const arrow = variant === 'arrows' && !checked ? arrowAway(value, anchor) : null;

  return (
    <Pressable
      role="radio"
      aria-checked={checked}
      aria-label={strings.names[anchor]}
      data-anchor={anchor}
      tabIndex={checked ? 0 : -1}
      disabled={disabled}
      className="anchor-picker__cell focus-ring-inset"
      onClick={() => onPick(anchor)}
    >
      {arrow === null
        ? <Box as="span" className="anchor-picker__dot" aria-hidden="true" />
        : <Icon name="arrow-up" size={12} className="anchor-picker__arrow" data-direction={arrow} />}
    </Pressable>
  );
};

export { AnchorCell };
