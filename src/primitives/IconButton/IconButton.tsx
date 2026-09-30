/* @layer renderer-components @kind component */
import '../../theme/button-surface.css';
import './IconButton.css';
import { type IconButtonProps } from './IconButton.type';

const IconButton = (props: IconButtonProps) => {
  const { variant = 'ghost', tone, size = 'sm', active = false, label, children, className = '', ...rest } = props;
  const cls = [
    'icon-btn', `icon-btn--${variant}`, variant !== 'ghost' && 'icon-btn--toned', tone && `icon-btn--tone-${tone}`, `icon-btn--${size}`,
    active && 'icon-btn--active', className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={cls}
      aria-label={label}
      aria-pressed={active || undefined}
      {...rest}
    >
      {children}
    </button>
  );
};

export {
  IconButton,
};
