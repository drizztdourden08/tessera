/* @layer renderer-components @kind component */
import '../../theme/control-size.css';
import '../../theme/focus-ring.css';
import '../../theme/segment-group.css';
import '../../theme/mixed-hatch.css';
import './SegmentedControl.css';
import { disabledReason } from '../field-control/disabled-reason';
import { isDisabled } from '../field-control/is-disabled';
import { useControlSize } from '../field-control/useControlSize';
import { useHintReport } from '../hint/useHintReport';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { optionMixed } from './behavior/option-mixed';
import { resolveClick } from './behavior/resolve-click';
import { segmentKeys } from './behavior/segment-keys';
import { segmentedClass } from './behavior/segmented-class';
import { useSegmentIndicator } from './behavior/useSegmentIndicator';
import { SegmentHeader } from './sub-components/SegmentHeader';
import { SegmentButton } from './sub-components/SegmentButton';
import type { SegmentedControlProps, SegmentSize } from './SegmentedControl.type';

const SegmentedControl = <T extends string = string>(props: SegmentedControlProps<T>) => {
  const { value, options, onChange, onDeselect, mixed, onHint, tooltipPlacement = 'top', label, description, size, selectedTone = 'accent', disabled = false, className } = props;
  const { fields } = useTesseraStrings();
  const resolved = useControlSize(size === 'sm-plus' ? 'sm' : size);
  const controlSize: SegmentSize = size === 'sm-plus' ? size : resolved;
  const { trackRef, indicatorStyle } = useSegmentIndicator(value, options);
  const { handlersFor } = useHintReport<T>({ hintOf: (key) => options.find((opt) => opt.value === key)?.hint, onHint });
  const choose = (next: T) => {
    const outcome = resolveClick(next, value, onDeselect !== undefined && mixed !== true);
    if (outcome.kind === 'deselect') onDeselect?.();
    else onChange(outcome.value);
  };
  const enabled = options.map((opt) => !disabled && !isDisabled(opt.disabled));
  const keys = segmentKeys({ trackRef, options, enabled, value, pick: onChange });

  return (
    <div className={segmentedClass({ size: controlSize, tone: selectedTone, disabled, mixed: mixed === true, className })}>
      <SegmentHeader label={label} description={description} />
      <div className="segmented__track" role="radiogroup" aria-label={label ?? props['aria-label']} aria-labelledby={label ? undefined : props['aria-labelledby']} aria-description={mixed === true ? fields.mixed : undefined} ref={trackRef}>
        <span className="segmented__indicator" style={indicatorStyle} />
        {options.map((opt, index) => (
          <SegmentButton<T>
            key={opt.value}
            option={opt}
            active={mixed !== true && value === opt.value}
            mixed={optionMixed(mixed, opt.value, value)}
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
