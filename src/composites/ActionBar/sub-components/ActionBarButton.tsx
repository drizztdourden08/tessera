/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { KIND_VARIANT } from '../ActionBar.constants';
import type { ActionBarButtonProps } from '../ActionBar.type';

const ActionBarButton = (props: ActionBarButtonProps) => {
  const { action, size, onPress } = props;
  const live = onPress !== undefined;
  return (
    <Button
      size={size}
      variant={KIND_VARIANT[action.kind ?? 'default']}
      icon={action.icon ? <Icon name={action.icon} /> : undefined}
      disabled={live ? action.disabled : undefined}
      tabIndex={live ? undefined : -1}
      data-action-id={live ? action.id : undefined}
      onClick={live ? () => onPress(action) : undefined}
    >
      {action.label}
    </Button>
  );
};

export { ActionBarButton };
