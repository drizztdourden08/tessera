/* @layer renderer-components @kind component */
import { preventTextSelection } from '../dom/prevent-text-selection';
import { IconButton } from '../IconButton';
import { Box } from '../Box';
import { AdornmentIcon } from './AdornmentIcon';
import { ADORNMENT_BUTTON_SIZES, ADORNMENT_ICON_SIZES } from './input-adornment.constants';
import type { InputAdornmentViewProps } from './input-adornment.type';
import { isAdornmentAction } from './is-adornment-action';
import './InputAdornmentView.css';

const InputAdornmentView = (props: InputAdornmentViewProps) => {
  const { adornment, size, disabled = false, focusable = true, className = '' } = props;
  const icon = <AdornmentIcon icon={adornment.icon} size={ADORNMENT_ICON_SIZES[size]} />;
  if (!isAdornmentAction(adornment)) {
    const { label } = adornment;
    return (
      <Box as="span" className={`input-adornment ${className}`} role={label === undefined ? undefined : 'img'} aria-label={label} aria-hidden={label === undefined || undefined}>
        {icon}
      </Box>
    );
  }
  return (
    <IconButton
      className={`input-adornment input-adornment--action ${className}`}
      variant="ghost"
      size={ADORNMENT_BUTTON_SIZES[size]}
      label={adornment.label}
      disabled={disabled}
      tabIndex={focusable ? undefined : -1}
      onMouseDown={preventTextSelection}
      onClick={adornment.onClick}
    >
      {icon}
    </IconButton>
  );
};

export { InputAdornmentView };
