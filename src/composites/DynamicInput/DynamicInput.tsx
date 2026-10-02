/* @layer renderer-components @kind component */
import '../../theme/control-size.css';
import './DynamicInput.css';
import { Box } from '../../primitives/Box';
import { FieldControlBoundary } from '../../primitives/FieldControlBoundary';
import { focusFromSurface } from './behavior/focus-from-surface';
import { partKey } from './behavior/part-key';
import { useDynamicInput } from './behavior/useDynamicInput';
import { PatternCounter } from './sub-components/PatternCounter';
import { PatternPart } from './sub-components/PatternPart';
import type { DynamicInputProps } from './DynamicInput.type';

const DynamicInput = (props: DynamicInputProps) => {
  const { className = '', counter, 'aria-label': ariaLabel } = props;
  const { field, rootRef, labelledBy, handleFocus, handleBlur } = useDynamicInput(props);
  const classes = [
    'dynamic-input',
    `control-size--${field.size}`,
    field.disabled ? 'dynamic-input--disabled' : '',
    field.invalid ? 'dynamic-input--invalid' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Box
      ref={rootRef}
      role="group"
      className={classes}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel === undefined ? labelledBy : undefined}
      onFocus={(event) => handleFocus(event.target)}
      onBlur={(event) => handleBlur(event.relatedTarget)}
    >
      <Box className="dynamic-input__surface" onMouseDown={(event) => focusFromSurface(field, event)}>
        <FieldControlBoundary>
          {field.parsed.parts.map((part, at) => <PatternPart key={partKey(part, at)} field={field} part={part} />)}
        </FieldControlBoundary>
      </Box>
      {counter !== undefined && <PatternCounter field={field} name={counter} />}
    </Box>
  );
};

export { DynamicInput };
