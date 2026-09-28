/* @layer renderer-components @kind component */
import '../../theme/focus-ring.css';
import '../../theme/segment-group.css';
import './ToggleGroup.css';
import type { ToggleGroupProps } from './ToggleGroup.type';

const ToggleGroup = <T extends string = string>(props: ToggleGroupProps<T>) => {
  const { value, options, onChange, label, description, disabled = false } = props;

  const toggle = (v: T) => {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v));
    } else {
      onChange([...value, v]);
    }
  };

  return (
    <div className={`toggle-group ${disabled ? 'toggle-group--disabled' : ''}`}>
      {[label, description].some(Boolean) && (
        <div className="toggle-group__header">
          {label && <span className="toggle-group__label">{label}</span>}
          {description && <span className="toggle-group__description">{description}</span>}
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
