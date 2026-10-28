/* @layer renderer-components @kind component */
import { useRef } from 'react';
import '../../theme/control-size.css';
import { Box } from '../../primitives/Box';
import { useControlSize } from '../../primitives/field-control/useControlSize';
import { NumberInput } from '../../primitives/NumberInput';
import { useNumberField } from './behavior/useNumberField';
import type { NumberFieldProps } from './NumberField.type';
import { NumberFieldLabel } from './sub-components/NumberFieldLabel';
import { NumberFieldTail } from './sub-components/NumberFieldTail';
import './NumberField.css';

const NumberField = (props: NumberFieldProps) => {
  const {
    value, onChange, label, min, max, step = 1, fineStep, ladder, presets, suffix, scrub = true, wheel = true,
    className, size, disabled, mixed, onKeyDown, onBlur, ...rest
  } = props;
  const controlSize = useControlSize(size);
  const rootRef = useRef<HTMLElement>(null);
  const locked = disabled === true || rest.readOnly === true;
  const field = useNumberField({ value, onChange, min, max, step, fineStep, ladder, scrub, wheel, locked, rootRef, onKeyDown, onBlur });

  return (
    <Box
      as="span"
      ref={rootRef}
      className={['number-field', `control-size--${controlSize}`, className].filter(Boolean).join(' ')}
      onFocus={field.onFocus}
      onBlur={field.onRootBlur}
    >
      <NumberFieldLabel text={label} scrub={field.scrubbing} rootRef={rootRef} />
      <NumberInput
        aria-label={label}
        {...rest}
        className="number-field__input"
        size={controlSize}
        value={field.shown}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        mixed={mixed}
        onStep={(direction) => field.stepBy(direction, false)}
        onChange={field.onType}
        onBlur={field.onBlur}
        onKeyDown={field.onKeyDown}
      />
      <NumberFieldTail suffix={suffix} presets={presets} value={value} locked={locked} onPick={field.apply} />
    </Box>
  );
};

export { NumberField };
