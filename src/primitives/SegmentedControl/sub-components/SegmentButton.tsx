/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { SEGMENT_ICON_SIZES } from '../SegmentedControl.constants';
import type { SegmentButtonProps } from '../SegmentedControl.type';

const SegmentButton = <T extends string>(props: SegmentButtonProps<T>) => {
  const { option, active, disabled, size, handlers, onSelect } = props;
  const name = option.icon === undefined ? option.title : option.title ?? option.hint.label;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      aria-label={name}
      title={option.title}
      className={`segmented__btn focus-ring-inset${active ? ' segmented__btn--active' : ''}`}
      onClick={onSelect}
      disabled={disabled}
      {...handlers}
    >
      {option.icon === undefined ? option.label : <Icon name={option.icon} size={SEGMENT_ICON_SIZES[size]} />}
    </button>
  );
};

export { SegmentButton };
