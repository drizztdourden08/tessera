/* @layer renderer-components @kind data */
import '../../theme/control-size.css';
import './RadioGroup.css';
import { useControlSize } from '../field-control/useControlSize';
import { Small, Span } from '../text-elements';
import type { RadioGroupProps } from './RadioGroup.type';

const RadioGroup = <T extends string = string>(props: RadioGroupProps<T>) => {
  const {
    value,
    options,
    onChange,
    label,
    description,
    direction = 'horizontal',
    disabled = false,
    name,
    size,
  } = props;
  const controlSize = useControlSize(size);

  const groupName = name ?? `radio-${label?.replace(/\s+/g, '-').toLowerCase() ?? 'group'}`;

  return (
    <fieldset className={`radio-group control-size--${controlSize} ${disabled ? 'radio-group--disabled' : ''}`}>
      {[label, description].some(Boolean) && (
        <div className="radio-group__header">
          {label && <legend className="radio-group__label">{label}</legend>}
          {description && <Small tone="dim" className="radio-group__description">{description}</Small>}
        </div>
      )}
      <div className={`radio-group__options radio-group__options--${direction}`}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`radio-group__option ${value === opt.value ? 'radio-group__option--active' : ''}`}
          >
            <input
              type="radio"
              className="radio-group__input"
              name={groupName}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              disabled={disabled}
            />
            <span className="radio-group__indicator" />
            <span className="radio-group__option-text">
              <Span className="radio-group__option-label">{opt.label}</Span>
              {opt.description && (
                <Span tone="dim" className="radio-group__option-desc">{opt.description}</Span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export {
  RadioGroup,
};
