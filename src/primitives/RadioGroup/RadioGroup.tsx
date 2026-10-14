/* @layer renderer-components @kind data */
import { useId } from 'react';
import '../../theme/control-size.css';
import './RadioGroup.css';
import { useControlSize } from '../field-control/useControlSize';
import { useHintReport } from '../hint/useHintReport';
import { Small } from '../text-elements';
import { RadioGroupOption } from './sub-components/RadioGroupOption';
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
          <RadioGroupOption<T>
            key={opt.value}
            option={opt}
            checked={value === opt.value}
            groupDisabled={disabled}
            name={groupName}
            handlers={handlersFor(opt.value)}
            onChange={onChange}
          />
        ))}
      </div>
    </fieldset>
  );
};

export {
  RadioGroup,
};
