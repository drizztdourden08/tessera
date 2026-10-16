/* @layer renderer-components @kind data */
import '../../theme/control-size.css';
import '../../theme/label-size.css';
import './Toggle.css';
import { useId } from 'react';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { helpLabelId } from '../field-control/help-label-id';
import { useControlSize } from '../field-control/useControlSize';
import { useHintTarget } from '../hint/useHintTarget';
import { ToggleText } from './sub-components/ToggleText';
import type { ToggleProps } from './Toggle.type';

const Toggle = (props: ToggleProps) => {
  const { checked, onChange, label, description, help, disabled = false, id, link, size, labelSize, hint, onHint, 'aria-label': ariaLabel, 'aria-labelledby': labelledBy } = props;
  const generatedId = useId();
  const control = useFieldControl(id);
  const controlSize = useControlSize(size);
  const toggleId = control.id ?? `toggle-${generatedId}`;
  const labelId = helpLabelId(help, label, `${toggleId}-label`);
  const hintHandlers = useHintTarget<HTMLLabelElement>({ hint, onHint });
  const classes = ['toggle', `control-size--${controlSize}`, labelSize && `label-size--${labelSize}`, disabled && 'toggle--disabled'].filter(Boolean).join(' ');

  return (
    <label className={classes} htmlFor={toggleId} {...hintHandlers}>
      <ToggleText label={label} labelId={labelId} description={description} help={help} link={link} />
      <input
        id={toggleId}
        type="checkbox"
        className="toggle__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        aria-label={label || labelledBy ? undefined : ariaLabel ?? hint?.label}
        aria-labelledby={label ? labelId : labelledBy}
        aria-describedby={control.describedBy}
      />
      <span className="toggle__track">
        <span className="toggle__thumb" />
      </span>
    </label>
  );
};

export {
  Toggle,
};
