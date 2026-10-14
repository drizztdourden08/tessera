/* @layer renderer-components @kind component */
import { disabledReason } from '../../field-control/disabled-reason';
import { isDisabled } from '../../field-control/is-disabled';
import { ReasonTip } from '../../field-control/ReasonTip';
import type { ToggleGroupButtonProps } from '../ToggleGroup.type';

const ToggleGroupButton = <T extends string>(props: ToggleGroupButtonProps<T>) => {
  const { option, active, groupDisabled, first, last, handlers, onToggle } = props;
  const reason = disabledReason(option.disabled);
  return (
    <ReasonTip reason={reason}>
      <button
        type="button"
        aria-pressed={active}
        aria-description={reason}
        className={`toggle-group__btn focus-ring-inset ${active ? 'toggle-group__btn--active' : ''}`}
        data-first={first || undefined}
        data-last={last || undefined}
        onClick={() => onToggle(option.value)}
        disabled={groupDisabled || isDisabled(option.disabled)}
        {...handlers}
      >
        {option.label}
      </button>
    </ReasonTip>
  );
};

export { ToggleGroupButton };
