/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import '../../theme/button-surface.css';
import { DENSITY_SIZE } from '../field-control/density.constants';
import { useDensity } from '../field-control/useDensity';
import { useHintTarget } from '../hint/useHintTarget';
import './Button.css';
import type { ButtonProps } from './Button.type';
import { buttonClass } from './behavior/button-class';
import { plainLabel } from './behavior/plain-label';
import { ButtonIcon } from './sub-components/ButtonIcon';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const density = useDensity();
  const {
    variant = 'tertiary', size = DENSITY_SIZE[density], fullWidth = false, active = false, loading = false, disabled,
    icon, iconEnd, hint, onHint, children, className = '', ...rest
  } = props;
  const hintHandlers = useHintTarget({ hint, onHint, handlers: rest });
  const cls = buttonClass({ variant, size, fullWidth, active, loading, oneLine: plainLabel(children), className });

  return (
    <button
      ref={ref}
      className={cls}
      aria-pressed={active || undefined}
      aria-busy={loading || undefined}
      disabled={loading || disabled}
      {...rest}
      {...hintHandlers}
    >
      <ButtonIcon icon={icon} loading={loading} />
      <span className="btn__label">{children}</span>
      <ButtonIcon icon={iconEnd} loading={false} end />
    </button>
  );
});

Button.displayName = 'Button';

export {
  Button,
};
