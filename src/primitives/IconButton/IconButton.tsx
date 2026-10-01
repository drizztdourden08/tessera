/* @layer renderer-components @kind component */
import '../../theme/button-surface.css';
import './IconButton.css';
import { useHintTarget } from '../hint/useHintTarget';
import { Spinner } from '../Spinner';
import { type IconButtonProps } from './IconButton.type';
import { iconButtonClass } from './behavior/icon-button-class';

const IconButton = (props: IconButtonProps) => {
  const { variant = 'ghost', tone, size = 'sm', active = false, loading = false, disabled, label, hint, onHint, children, className, ...rest } = props;
  const hintHandlers = useHintTarget({ hint, onHint, handlers: rest });

  return (
    <button
      type="button"
      className={iconButtonClass({ variant, tone, size, active, loading, className })}
      aria-label={label}
      aria-pressed={active || undefined}
      aria-busy={loading || undefined}
      disabled={loading || disabled}
      {...rest}
      {...hintHandlers}
    >
      {loading ? <span className="icon-btn__spinner" aria-hidden="true"><Spinner size="sm" /></span> : children}
    </button>
  );
};

export {
  IconButton,
};
