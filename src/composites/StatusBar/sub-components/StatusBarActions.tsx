/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Tooltip } from '../../../primitives/Tooltip';
import type { StatusBarActionsProps } from './StatusBarActions.type';

const StatusBarActions = (props: StatusBarActionsProps) => {
  const { actions } = props;
  if (actions.length === 0) return null;
  return (
    <Box className="status-bar__actions">
      {actions.map((action) => (
        <Tooltip key={action.id} content={action.label}>
          <IconButton size="xs" label={action.label} loading={action.loading} disabled={action.disabled} onClick={action.onSelect}>
            <Icon name={action.icon} />
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export { StatusBarActions };
