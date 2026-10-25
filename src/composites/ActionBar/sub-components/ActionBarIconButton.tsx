/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Tooltip } from '../../../primitives/Tooltip';
import { ICON_KIND_VARIANT } from '../ActionBar.constants';
import type { ActionBarButtonProps } from '../ActionBar.type';

const ActionBarIconButton = (props: ActionBarButtonProps) => {
  const { action, size, onPress } = props;
  const live = onPress !== undefined;
  const kind = action.kind ?? 'default';
  return (
    <Tooltip content={action.label}>
      <IconButton
        size={size}
        variant={ICON_KIND_VARIANT[kind]}
        tone={kind === 'danger' ? 'danger' : undefined}
        label={action.label}
        disabled={live ? action.disabled : undefined}
        tabIndex={live ? undefined : -1}
        data-action-id={live ? action.id : undefined}
        onClick={live ? () => onPress(action) : undefined}
      >
        {action.icon && <Icon name={action.icon} />}
      </IconButton>
    </Tooltip>
  );
};

export { ActionBarIconButton };
