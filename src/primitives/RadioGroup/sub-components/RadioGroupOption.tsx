/* @layer renderer-components @kind component */
import { disabledReason } from '../../field-control/disabled-reason';
import { isDisabled } from '../../field-control/is-disabled';
import { ReasonTip } from '../../field-control/ReasonTip';
import { Span } from '../../text-elements';
import type { RadioGroupOptionProps } from '../RadioGroup.type';

const optionClass = (checked: boolean, off: boolean): string =>
  ['radio-group__option', checked && 'radio-group__option--active', off && 'radio-group__option--disabled'].filter(Boolean).join(' ');

const RadioGroupOption = <T extends string>(props: RadioGroupOptionProps<T>) => {
  const { option, checked, groupDisabled, name, handlers, onChange } = props;
  const off = isDisabled(option.disabled);
  const reason = disabledReason(option.disabled);
  return (
    <ReasonTip reason={reason}>
      <label className={optionClass(checked, off)} {...handlers}>
        <input
          type="radio"
          className="radio-group__input"
          name={name}
          value={option.value}
          checked={checked}
          onChange={() => onChange(option.value)}
          disabled={groupDisabled || off}
          aria-description={reason}
        />
        <span className="radio-group__indicator" />
        <span className="radio-group__option-text">
          <Span className="radio-group__option-label">{option.label}</Span>
          {option.description && (
            <Span tone="dim" className="radio-group__option-desc">{option.description}</Span>
          )}
        </span>
      </label>
    </ReasonTip>
  );
};

export { RadioGroupOption };
