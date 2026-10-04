/* @layer renderer-components @kind data */
import { useId } from 'react';
import '../../theme/control-size.css';
import './RadioGroup.css';
import { useControlSize } from '../field-control/useControlSize';
import { useHintReport } from '../hint/useHintReport';
import { Small, Span } from '../text-elements';
import type { RadioGroupProps } from './RadioGroup.type';

const RadioGroup = <T extends string = string>(props: RadioGroupProps<T>) => {
  const {
    value,
    options,
    onChange,
    onHint,
    label,
    description,
    direction = 'horizontal',
    disabled = false,
    name,
    size,
  } = props;
  const controlSize = useControlSize(size);
  const { handlersFor } = useHintReport<T>({ hintOf: (key) => options.find((opt) => opt.value === key)?.hint, onHint });

  const autoId = useId();
  const groupName = name ?? `radio-${autoId}`;
  const descriptionId = description ? `${autoId}-description` : undefined;

  return (
    <fieldset
      className={`radio-group control-size--${controlSize} ${disabled ? 'radio-group--disabled' : ''}`}
      aria-describedby={descriptionId}
    >
      {label && <legend className="radio-group__label">{label}</legend>}
      {description && <Small id={descriptionId} tone="dim" className="radio-group__description">{description}</Small>}
      <div className={`radio-group__options radio-group__options--${direction}`}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`radio-group__option ${value === opt.value ? 'radio-group__option--active' : ''}`}
            {...handlersFor(opt.value)}
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
