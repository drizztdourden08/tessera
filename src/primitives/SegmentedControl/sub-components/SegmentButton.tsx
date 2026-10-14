/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { ReasonTip } from '../../field-control/ReasonTip';
import { SEGMENT_ICON_SIZES } from '../SegmentedControl.constants';
import type { SegmentButtonProps } from '../SegmentedControl.type';

const SegmentButton = <T extends string>(props: SegmentButtonProps<T>) => {
  const { option, active, disabled, reason, stop, size, handlers, onSelect, onKeyDown } = props;
  const name = option.icon === undefined ? option.title : option.title ?? option.hint.label;
  return (
    <ReasonTip reason={reason}>
      <button
        type="button"
        role="radio"
        aria-checked={active}
        aria-label={name}
        aria-description={reason}
        title={option.title}
        tabIndex={stop ? 0 : -1}
        className={`segmented__btn focus-ring-inset${active ? ' segmented__btn--active' : ''}`}
        onClick={onSelect}
        onKeyDown={onKeyDown}
        disabled={disabled}
        {...handlers}
      >
        {option.icon === undefined ? option.label : <Icon name={option.icon} size={SEGMENT_ICON_SIZES[size]} />}
      </button>
    </ReasonTip>
  );
};

export { SegmentButton };
