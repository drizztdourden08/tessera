/* @layer renderer-components @kind component */
import '../../theme/button-surface.css';
import './IconButton.css';
import '../../theme/small-target.css';
import '../../theme/mixed-hatch.css';
import { useHintTarget } from '../hint/useHintTarget';
import { Spinner } from '../Spinner';
import { type IconButtonProps } from './IconButton.type';
import { iconButtonClass } from './behavior/icon-button-class';
import { iconButtonState } from './behavior/icon-button-state';
import { IconButtonTip } from './sub-components/IconButtonTip';

const IconButton = (props: IconButtonProps) => {
  const { variant = 'ghost', tone, size = 'sm', active = false, mixed = false, loading = false, disabled, label, hint, onHint, tooltip, tooltipPlacement, children, className, ...rest } = props;
  const hintHandlers = useHintTarget({ hint, onHint, handlers: rest });

  return (
    <IconButtonTip tooltip={tooltip} placement={tooltipPlacement}>
      <button
        type="button"
        className={iconButtonClass({ variant, tone, size, active, mixed, loading, className })}
        aria-label={label}
        {...iconButtonState({ mixed, active, loading, disabled })}
        {...rest}
        {...hintHandlers}
      >
        {loading ? <span className="icon-btn__spinner" aria-hidden="true"><Spinner size="sm" /></span> : children}
      </button>
    </IconButtonTip>
  );
};

export {
  IconButton,
};
