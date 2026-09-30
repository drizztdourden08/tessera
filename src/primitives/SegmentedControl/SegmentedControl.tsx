/* @layer renderer-components @kind component */
import '../../theme/focus-ring.css';
import '../../theme/segment-group.css';
import './SegmentedControl.css';
import { Small, Span } from '../text-elements';
import { resolveClick } from './behavior/resolve-click';
import { useSegmentIndicator } from './behavior/useSegmentIndicator';
import type { SegmentedControlProps } from './SegmentedControl.type';

const SegmentedControl = <T extends string = string>(props: SegmentedControlProps<T>) => {
  const {
    value,
    options,
    onChange,
    onDeselect,
    label,
    description,
    disabled = false,
  } = props;

  const { trackRef, indicatorStyle } = useSegmentIndicator(value, options);

  return (
    <div className={`segmented ${disabled ? 'segmented--disabled' : ''}`}>
      {[label, description].some(Boolean) && (
        <div className="segmented__header">
          {label && <Span className="segmented__label">{label}</Span>}
          {description && <Small tone="dim" className="segmented__description">{description}</Small>}
        </div>
      )}
      <div className="segmented__track" role="radiogroup" aria-label={label} ref={trackRef}>
        <span
          className="segmented__indicator"
          style={indicatorStyle}
        />
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={value === opt.value}
            aria-label={opt.title}
            title={opt.title}
            className={`segmented__btn focus-ring-inset ${value === opt.value ? 'segmented__btn--active' : ''}`}
            onClick={() => {
              const outcome = resolveClick(opt.value, value, onDeselect !== undefined);
              if (outcome.kind === 'deselect') onDeselect?.();
              else onChange(outcome.value);
            }}
            disabled={disabled || opt.disabled}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export {
  SegmentedControl,
};
