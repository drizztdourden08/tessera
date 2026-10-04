/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { CopyButton } from '../../../primitives/CopyButton';
import { Icon } from '../../../primitives/Icon';
import type { ActionTileButtonProps } from '../ActionTile.type';

const ActionTileButton = (props: ActionTileButtonProps) => {
  const { action } = props;
  const variant = action.variant ?? 'secondary';
  return (
    <Box className="action-tile__action">
      {action.copy === undefined
        ? (
            <Button size="sm" variant={variant} disabled={action.disabled} onClick={action.onSelect} icon={action.icon ? <Icon name={action.icon} /> : undefined}>
              {action.label}
            </Button>
          )
        : <CopyButton text={action.copy} label={action.label} showLabel size="sm" variant={variant} disabled={action.disabled} />}
    </Box>
  );
};

export { ActionTileButton };
