/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import '../../theme/button-surface.css';
import './Button.css';
import type { ButtonProps } from './Button.type';
import { buttonClass } from './behavior/button-class';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant = 'tertiary', size = 'md', fullWidth = false, active = false, icon, children, className = '', ...rest } = props;
  const cls = buttonClass({ variant, size, fullWidth, active, className });

  return (
    <button ref={ref} className={cls} aria-pressed={active || undefined} {...rest}>
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
});

export {
  Button,
};
