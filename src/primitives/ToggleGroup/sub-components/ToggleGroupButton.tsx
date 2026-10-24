/* @layer renderer-components @kind component */
import { disabledReason } from '../../field-control/disabled-reason';
import { isDisabled } from '../../field-control/is-disabled';
import { OptionTip } from '../../field-control/OptionTip';
import type { ToggleGroupButtonProps } from '../ToggleGroup.type';

const ToggleGroupButton = <T extends string>(props: ToggleGroupButtonProps<T>) => {
  const { option, active, groupDisabled, first, last, handlers, placement, onToggle } = props;
  const reason = disabledReason(option.disabled);
  return (
    <OptionTip reason={reason} name={option.label} tooltip={option.tooltip} placement={placement}>
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
    </OptionTip>
  );
};

export { ToggleGroupButton };
