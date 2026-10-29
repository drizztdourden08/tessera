/* @layer renderer-components @kind component */
import '../../theme/control-size.css';
import '../../theme/focus-ring.css';
import '../../theme/segment-group.css';
import './SegmentedControl.css';
import { disabledReason } from '../field-control/disabled-reason';
import { isDisabled } from '../field-control/is-disabled';
import { useControlSize } from '../field-control/useControlSize';
import { useHintReport } from '../hint/useHintReport';
import { Small, Span } from '../text-elements';
import { resolveClick } from './behavior/resolve-click';
import { segmentKeys } from './behavior/segment-keys';
import { segmentedClass } from './behavior/segmented-class';
import { useSegmentIndicator } from './behavior/useSegmentIndicator';
import { SegmentButton } from './sub-components/SegmentButton';
import type { SegmentedControlProps } from './SegmentedControl.type';

const SegmentedControl = <T extends string = string>(props: SegmentedControlProps<T>) => {
  const { value, options, onChange, onDeselect, onHint, tooltipPlacement = 'top', label, description, size, selectedTone = 'accent', disabled = false, className } = props;
  const controlSize = useControlSize(size);
  const { trackRef, indicatorStyle } = useSegmentIndicator(value, options);
  const { handlersFor } = useHintReport<T>({ hintOf: (key) => options.find((opt) => opt.value === key)?.hint, onHint });
  const choose = (next: T) => {
    const outcome = resolveClick(next, value, onDeselect !== undefined);
    if (outcome.kind === 'deselect') onDeselect?.();
    else onChange(outcome.value);
  };
  const enabled = options.map((opt) => !disabled && !isDisabled(opt.disabled));
  const keys = segmentKeys({ trackRef, options, enabled, value, pick: onChange });

  return (
    <div className={segmentedClass(controlSize, selectedTone, disabled, className)}>
      {[label, description].some(Boolean) && (
        <div className="segmented__header">
          {label && <Span className="segmented__label">{label}</Span>}
          {description && <Small tone="dim" className="segmented__description">{description}</Small>}
        </div>
      )}
      <div className="segmented__track" role="radiogroup" aria-label={label ?? props['aria-label']} aria-labelledby={label ? undefined : props['aria-labelledby']} ref={trackRef}>
        <span className="segmented__indicator" style={indicatorStyle} />
        {options.map((opt, index) => (
          <SegmentButton<T>
            key={opt.value}
            option={opt}
            active={value === opt.value}
            disabled={enabled[index] !== true}
            reason={disabledReason(opt.disabled)}
            stop={index === keys.stop}
            size={controlSize}
            handlers={handlersFor(opt.value)}
            placement={tooltipPlacement}
            onSelect={() => choose(opt.value)}
            onKeyDown={keys.onKeyDown}
          />
        ))}
      </div>
    </div>
  );
};

export {
  SegmentedControl,
};
