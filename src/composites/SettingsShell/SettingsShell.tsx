/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SideNav } from '../SideNav';
import { useShellNav } from './behavior/useShellNav';
import type { SettingsShellProps } from './SettingsShell.type';
import '../../theme/glass-panel.css';
import './SettingsShell.css';

const SettingsShell = (props: SettingsShellProps) => {
  const { nav, filterable = false, filterPlaceholder, header, children, className = '' } = props;
  const { common } = useTesseraStrings();
  const shellNav = useShellNav(nav, filterable ? filterPlaceholder ?? common.filterPlaceholder : undefined);
  return (
    <Box className={`settings-shell${className ? ` ${className}` : ''}`}>
      {header && <Box className="settings-shell__header">{header}</Box>}
      <Box className="settings-shell__body">
        <SideNav {...shellNav} defaultOpen={shellNav.defaultOpen ?? true} />
        <Box className="settings-shell__content glass-panel">{children}</Box>
      </Box>
    </Box>
  );
};

export { SettingsShell };
