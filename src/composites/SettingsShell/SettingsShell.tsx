/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { SideNav } from '../SideNav';
import type { SettingsShellProps } from './SettingsShell.type';
import '../../theme/glass-panel.css';
import './SettingsShell.css';

const SettingsShell = (props: SettingsShellProps) => {
  const { nav, children, className = '' } = props;
  return (
    <Box className={`settings-shell${className ? ` ${className}` : ''}`}>
      <SideNav {...nav} />
      <Box className="settings-shell__content glass-panel">{children}</Box>
    </Box>
  );
};

export { SettingsShell };
