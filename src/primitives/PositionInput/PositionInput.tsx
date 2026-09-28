/* @layer renderer-components @kind component */
import './PositionInput.css';
import { useCallback } from 'react';
import { FieldControlBoundary } from '../Field/FieldControlBoundary';
import { AxisField } from './sub-components/AxisField';
import type { PositionInputProps } from './PositionInput.type';
import { DEFAULT_X_LABEL, DEFAULT_Y_LABEL, OPEN_AXIS } from './PositionInput.constants';

const PositionInput = (props: PositionInputProps) => {
  const { value, onChange, x = OPEN_AXIS, y = OPEN_AXIS, disabled = false, label, className = '' } = props;

  const commitX = useCallback((next: number) => onChange({ ...value, x: next }), [onChange, value]);
  const commitY = useCallback((next: number) => onChange({ ...value, y: next }), [onChange, value]);

  const classes = [
    'position-input',
    disabled ? 'position-input--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="group" aria-label={label}>
      {label != null && <span className="position-input__label">{label}</span>}
      <div className="position-input__axes">
        <FieldControlBoundary>
          <AxisField
            axis={x}
            axisLabel={x.label ?? DEFAULT_X_LABEL}
            value={value.x}
            disabled={disabled}
            onCommit={commitX}
          />
          <AxisField
            axis={y}
            axisLabel={y.label ?? DEFAULT_Y_LABEL}
            value={value.y}
            disabled={disabled}
            onCommit={commitY}
          />
        </FieldControlBoundary>
      </div>
    </div>
  );
};

export { PositionInput };
