/* @layer renderer-components @kind component */
import { NumberInput } from '../../NumberInput';
import { Span } from '../../text-elements';
import { useAxisDraft } from '../behavior/useAxisDraft';
import type { AxisFieldProps } from '../PositionInput.type';
import { DEFAULT_STEP } from './AxisField.constants';

const AxisField = (props: AxisFieldProps) => {
  const { axis, axisLabel, value, disabled, onCommit } = props;
  const { fieldValue, handleChange, handleBlur, handleKeyDown } = useAxisDraft({ value, axis, onCommit });

  return (
    <label className="position-input__axis">
      <Span tone="dim" className="position-input__cap">{axisLabel}</Span>
      <NumberInput
        className="position-input__field"
        value={fieldValue}
        min={axis.min}
        max={axis.max}
        step={axis.step ?? DEFAULT_STEP}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </label>
  );
};

export { AxisField };
