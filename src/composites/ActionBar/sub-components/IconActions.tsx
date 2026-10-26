/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ActionBar } from '../ActionBar';
import { ICON_ACTIONS_KEEP } from '../ActionBar.constants';
import type { IconActionsProps } from './IconActions.type';

const IconActions = ({ actions, className }: IconActionsProps) => {
  if (!actions || actions.length === 0) return null;
  const icons = actions.map((action) => ({ ...action, iconOnly: true as const }));
  return (
    <Box className={className} onClick={(event) => event.stopPropagation()}>
      <ActionBar actions={icons} size="sm" keep={ICON_ACTIONS_KEEP} align="end" />
    </Box>
  );
};

export { IconActions };
