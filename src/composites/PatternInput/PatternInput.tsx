/* @layer renderer-components @kind component */
import '../../theme/control-size.css';
import './PatternInput.css';
import { Box } from '../../primitives/Box';
import { FieldControlBoundary } from '../../primitives/FieldControlBoundary';
import { focusFromSurface } from './behavior/focus-from-surface';
import { partKey } from './behavior/part-key';
import { usePatternInput } from './behavior/usePatternInput';
import { PatternCounter } from './sub-components/PatternCounter';
import { PatternPart } from './sub-components/PatternPart';
import type { PatternInputProps } from './PatternInput.type';

const PatternInput = (props: PatternInputProps) => {
  const { className = '', counter, 'aria-label': ariaLabel } = props;
  const { field, rootRef, labelledBy, handleFocus, handleBlur } = usePatternInput(props);
  const classes = [
    'pattern-input',
    `control-size--${field.size}`,
    field.disabled ? 'pattern-input--disabled' : '',
    field.invalid ? 'pattern-input--invalid' : '',
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
      <Box className="pattern-input__surface" onMouseDown={(event) => focusFromSurface(field, event)}>
        <FieldControlBoundary>
          {field.parsed.parts.map((part, at) => <PatternPart key={partKey(part, at)} field={field} part={part} />)}
        </FieldControlBoundary>
      </Box>
      {counter !== undefined && <PatternCounter field={field} name={counter} />}
    </Box>
  );
};

export { PatternInput };
