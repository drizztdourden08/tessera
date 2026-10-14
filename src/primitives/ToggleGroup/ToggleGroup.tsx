/* @layer renderer-components @kind component */
import '../../theme/control-size.css';
import '../../theme/focus-ring.css';
import '../../theme/segment-group.css';
import './ToggleGroup.css';
import { toggleValue } from '../field-control/toggle-value';
import { useControlSize } from '../field-control/useControlSize';
import { useHintReport } from '../hint/useHintReport';
import { Small, Span } from '../text-elements';
import { ToggleGroupButton } from './sub-components/ToggleGroupButton';
import type { ToggleGroupProps } from './ToggleGroup.type';

const ToggleGroup = <T extends string = string>(props: ToggleGroupProps<T>) => {
  const { value, options, onChange, onHint, label, description, disabled = false, size } = props;
  const controlSize = useControlSize(size);
  const { handlersFor } = useHintReport<T>({ hintOf: (key) => options.find((opt) => opt.value === key)?.hint, onHint });

  const toggle = (v: T) => onChange(toggleValue(value, v));

  return (
    <div className={`toggle-group control-size--${controlSize} ${disabled ? 'toggle-group--disabled' : ''}`}>
      {[label, description].some(Boolean) && (
        <div className="toggle-group__header">
          {label && <Span className="toggle-group__label">{label}</Span>}
          {description && <Small tone="dim" className="toggle-group__description">{description}</Small>}
        </div>
      )}
      <div className="toggle-group__track" role="group" aria-label={label}>
        {options.map((opt, index) => (
          <ToggleGroupButton<T>
            key={opt.value}
            option={opt}
            active={value.includes(opt.value)}
            groupDisabled={disabled}
            first={index === 0}
            last={index === options.length - 1}
            handlers={handlersFor(opt.value)}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export { ToggleGroup };
