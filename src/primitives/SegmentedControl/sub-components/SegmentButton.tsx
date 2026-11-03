/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { Icon } from '../../Icon';
import { isIconName } from '../../Icon/behavior/is-icon-name';
import { OptionTip } from '../../field-control/OptionTip';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { segmentButtonClass } from '../behavior/segment-button-class';
import { segmentNames } from '../behavior/segment-names';
import { SEGMENT_ICON_SIZES } from '../SegmentedControl.constants';
import type { SegmentButtonProps, SegmentIcon, SegmentSize } from '../SegmentedControl.type';

const iconNode = (icon: SegmentIcon, size: SegmentSize): ReactNode =>
  (typeof icon === 'string' && isIconName(icon) ? <Icon name={icon} size={SEGMENT_ICON_SIZES[size]} /> : icon);

const SegmentButton = <T extends string>(props: SegmentButtonProps<T>) => {
  const { option, active, mixed, disabled, reason, stop, size, handlers, placement, onSelect, onKeyDown } = props;
  const { fields } = useTesseraStrings();
  const { name, shown } = segmentNames(option);
  return (
    <OptionTip reason={reason} name={shown} tooltip={option.tooltip} placement={placement}>
      <button
        type="button"
        role="radio"
        aria-checked={active}
        aria-label={name}
        aria-description={reason ?? (mixed ? fields.mixed : undefined)}
        title={option.tooltip === undefined ? option.title : undefined}
        tabIndex={stop ? 0 : -1}
        className={segmentButtonClass(active, mixed)}
        onClick={onSelect}
        onKeyDown={onKeyDown}
        disabled={disabled}
        {...handlers}
      >
        {option.icon === undefined ? option.label : iconNode(option.icon, size)}
      </button>
    </OptionTip>
  );
};

export { SegmentButton };
