/* @layer renderer-components @kind data */
import '../../theme/control-size.css';
import '../../theme/label-size.css';
import './Toggle.css';
import '../../theme/mixed-hatch.css';
import { useId } from 'react';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { helpLabelId } from '../field-control/help-label-id';
import { useControlSize } from '../field-control/useControlSize';
import { useHintTarget } from '../hint/useHintTarget';
import { toggleAria } from './behavior/toggle-aria';
import { toggleClass } from './behavior/toggle-class';
import { ToggleText } from './sub-components/ToggleText';
import type { ToggleProps } from './Toggle.type';

const Toggle = (props: ToggleProps) => {
  const { checked, onChange, label, description, help, disabled = false, mixed = false, id, link, size, labelSize, hint, onHint, 'aria-label': ariaLabel, 'aria-labelledby': labelledBy } = props;
  const generatedId = useId();
  const control = useFieldControl(id);
  const controlSize = useControlSize(size);
  const toggleId = control.id ?? `toggle-${generatedId}`;
  const labelId = helpLabelId(help, label, `${toggleId}-label`);
  const hintHandlers = useHintTarget<HTMLLabelElement>({ hint, onHint });
  const classes = toggleClass({ controlSize, labelSize, mixed, disabled });
  const aria = toggleAria({ checked, mixed, label, labelId, labelledBy, ariaLabel, hintLabel: hint?.label });

  return (
    <label className={classes} htmlFor={toggleId} {...hintHandlers}>
      <ToggleText label={label} labelId={labelId} description={description} help={help} link={link} />
      <input
        id={toggleId}
        type="checkbox"
        className="toggle__input"
        checked={checked}
        onChange={(e) => onChange(mixed || e.target.checked)}
        disabled={disabled}
        role="switch"
        aria-describedby={control.describedBy}
        {...aria}
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
