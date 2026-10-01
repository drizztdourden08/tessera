/* @layer renderer-components @kind component */
import '../../theme/control-size.css';
import '../../theme/focus-ring.css';
import '../../theme/segment-group.css';
import './ToggleGroup.css';
import { useControlSize } from '../field-control/useControlSize';
import { useHintReport } from '../hint/useHintReport';
import { Small, Span } from '../text-elements';
import type { ToggleGroupProps } from './ToggleGroup.type';

const ToggleGroup = <T extends string = string>(props: ToggleGroupProps<T>) => {
  const { value, options, onChange, onHint, label, description, disabled = false, size } = props;
  const controlSize = useControlSize(size);
  const { handlersFor } = useHintReport<T>({ hintOf: (key) => options.find((opt) => opt.value === key)?.hint, onHint });

  const toggle = (v: T) => {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v));
    } else {
      onChange([...value, v]);
    }
  };

  return (
    <div className={`toggle-group control-size--${controlSize} ${disabled ? 'toggle-group--disabled' : ''}`}>
      {[label, description].some(Boolean) && (
        <div className="toggle-group__header">
          {label && <Span className="toggle-group__label">{label}</Span>}
          {description && <Small tone="dim" className="toggle-group__description">{description}</Small>}
        </div>
      )}
      <div className="toggle-group__track" role="group" aria-label={label}>
        {options.map((opt) => {
          const active = value.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              className={`toggle-group__btn focus-ring-inset ${active ? 'toggle-group__btn--active' : ''}`}
              onClick={() => toggle(opt.value)}
              disabled={disabled || opt.disabled}
              {...handlersFor(opt.value)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { ToggleGroup };
