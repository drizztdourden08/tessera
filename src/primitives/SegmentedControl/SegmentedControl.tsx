/* @layer renderer-components @kind component */
import '../../theme/focus-ring.css';
import '../../theme/segment-group.css';
import './SegmentedControl.css';
import { useHintReport } from '../hint/useHintReport';
import { Small, Span } from '../text-elements';
import { resolveClick } from './behavior/resolve-click';
import { useSegmentIndicator } from './behavior/useSegmentIndicator';
import { SegmentButton } from './sub-components/SegmentButton';
import type { SegmentedControlProps } from './SegmentedControl.type';

const SegmentedControl = <T extends string = string>(props: SegmentedControlProps<T>) => {
  const { value, options, onChange, onDeselect, onHint, label, description, size = 'md', disabled = false } = props;
  const { trackRef, indicatorStyle } = useSegmentIndicator(value, options);
  const { handlersFor } = useHintReport<T>({ hintOf: (key) => options.find((opt) => opt.value === key)?.hint, onHint });
  const choose = (next: T) => {
    const outcome = resolveClick(next, value, onDeselect !== undefined);
    if (outcome.kind === 'deselect') onDeselect?.();
    else onChange(outcome.value);
  };

  return (
    <div className={['segmented', `segmented--${size}`, disabled && 'segmented--disabled'].filter(Boolean).join(' ')}>
      {[label, description].some(Boolean) && (
        <div className="segmented__header">
          {label && <Span className="segmented__label">{label}</Span>}
          {description && <Small tone="dim" className="segmented__description">{description}</Small>}
        </div>
      )}
      <div className="segmented__track" role="radiogroup" aria-label={label ?? props['aria-label']} ref={trackRef}>
        <span className="segmented__indicator" style={indicatorStyle} />
        {options.map((opt) => (
          <SegmentButton<T>
            key={opt.value}
            option={opt}
            active={value === opt.value}
            disabled={disabled || opt.disabled === true}
            size={size}
            handlers={handlersFor(opt.value)}
            onSelect={() => choose(opt.value)}
          />
        ))}
      </div>
    </div>
  );
};

export {
  SegmentedControl,
};
