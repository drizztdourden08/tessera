/* @layer renderer-components @kind component */
import { NavLayout } from '../NavLayout';
import { ScreenWindow } from '../ScreenWindow';
import { SettingsPage } from '../SettingsPage';
import type { WorkspaceScreenProps } from './WorkspaceScreen.type';

const WorkspaceScreen = (props: WorkspaceScreenProps) => {
  const { title, onClose, nav, page, children, subtitle, extra, floating, hidden, results, filterable, filterPlaceholder, compact, className = '' } = props;

  return (
    <ScreenWindow
      title={title}
      subtitle={subtitle}
      extra={extra}
      floating={floating}
      hidden={hidden}
      onClose={onClose}
      className={`workspace-screen${className ? ` ${className}` : ''}`}
    >
      <NavLayout nav={nav} results={results} filterable={filterable} filterPlaceholder={filterPlaceholder} compact={compact} paneScroll="none">
        <SettingsPage {...page}>{children}</SettingsPage>
      </NavLayout>
    </ScreenWindow>
  );
};

export { WorkspaceScreen };
