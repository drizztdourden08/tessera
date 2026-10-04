/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { SettingsRowActionButton } from './SettingsRowActionButton';
import type { SettingsRowEndProps } from './SettingsRowEnd.type';

const SettingsRowEnd = (props: SettingsRowEndProps) => {
  const { actions = [], disabled, children } = props;
  if (actions.length === 0) return children;
  return (
    <Box className="settings-row__end">
      {children}
      <Box className="settings-row__actions">
        {actions.map((action) => <SettingsRowActionButton key={action.id} action={action} disabled={disabled} />)}
      </Box>
    </Box>
  );
};

export { SettingsRowEnd };
