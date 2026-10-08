/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import '../../theme/button-surface.css';
import './Button.css';
import type { ButtonProps } from './Button.type';
import { buttonClass } from './behavior/button-class';
import { plainLabel } from './behavior/plain-label';
import { ButtonIcon } from './sub-components/ButtonIcon';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'tertiary', size = 'md', fullWidth = false, active = false, loading = false, disabled,
    icon, children, className = '', ...rest
  } = props;
  const cls = buttonClass({ variant, size, fullWidth, active, loading, oneLine: plainLabel(children), className });

  return (
    <button
      ref={ref}
      className={cls}
      aria-pressed={active || undefined}
      aria-busy={loading || undefined}
      disabled={loading || disabled}
      {...rest}
    >
      <ButtonIcon icon={icon} loading={loading} />
      <span className="btn__label">{children}</span>
    </button>
  );
});

Button.displayName = 'Button';

export {
  Button,
};
