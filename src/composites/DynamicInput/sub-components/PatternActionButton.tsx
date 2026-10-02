/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { isIconName } from '../behavior/is-icon-name';
import { ACTION_SIZES, FALLBACK_ACTION_ICON, ICON_SIZES } from '../DynamicInput.constants';
import type { AdornmentProps } from './PatternAdornment.type';

const PatternActionButton = (props: AdornmentProps) => {
  const { field, name } = props;
  const action = field.setup.actions?.[name];
  if (action === undefined) return null;
  const icon = action.icon ?? (isIconName(name) ? name : FALLBACK_ACTION_ICON);

  return (
    <IconButton
      className="dynamic-input__action"
      size={ACTION_SIZES[field.size]}
      label={action.label}
      disabled={field.disabled || action.disabled === true}
      onClick={() => action.onPress(field.value)}
    >
      <Icon name={icon} size={ICON_SIZES[field.size]} />
    </IconButton>
  );
};

export { PatternActionButton };
