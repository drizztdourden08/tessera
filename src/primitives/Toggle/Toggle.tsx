/* @layer renderer-components @kind data */
import './Toggle.css';
import { useId } from 'react';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { Glyph } from '../Glyph';
import type { ToggleProps } from './Toggle.type';

const Toggle = (props: ToggleProps) => {
  const { checked, onChange, label, description, disabled = false, id, link, 'aria-label': ariaLabel } = props;
  const generatedId = useId();
  const control = useFieldControl(id);
  const toggleId = control.id ?? `toggle-${generatedId}`;

  return (
    <label className={`toggle ${disabled ? 'toggle--disabled' : ''}`} htmlFor={toggleId}>
      {[label, description].some(Boolean) && (
        <span className="toggle__text">
          {label && <span className="toggle__label">{label}</span>}
          {description && (
            <span className="toggle__description">
              {description}
              {link && (
                <a
                  className="toggle__link"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Learn more"
                >
                  <Glyph name="external" size={12} />
                </a>
              )}
            </span>
          )}
        </span>
      )}
      <input
        id={toggleId}
        type="checkbox"
        className="toggle__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        aria-label={label ? undefined : ariaLabel}
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
