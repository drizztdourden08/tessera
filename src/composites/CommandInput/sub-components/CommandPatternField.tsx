/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { DynamicInput } from '../../DynamicInput';
import { specPatternValue } from '../behavior/spec-pattern-value';
import { specSlotValues } from '../behavior/spec-slot-values';
import type { CommandPatternFieldProps } from './CommandPatternField.type';

const CommandPatternField = ({ spec, values, size, disabled, onValues }: CommandPatternFieldProps) => {
  const value = useMemo(() => specPatternValue(spec.pattern, values), [spec.pattern, values]);
  return (
    <DynamicInput
      {...spec.setup}
      className="command-input__pattern"
      aria-label={spec.label}
      pattern={spec.pattern}
      value={value}
      size={size}
      disabled={disabled}
      onChange={(next) => onValues(specSlotValues(next))}
    />
  );
};

export { CommandPatternField };
