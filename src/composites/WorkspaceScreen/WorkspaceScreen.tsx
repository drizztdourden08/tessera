/* @layer renderer-components @kind component */
import { useHeaderOptOutCheck } from '../ScreenPage/behavior/useHeaderOptOutCheck';
import { ScreenBackdrop } from '../ScreenPage/sub-components/ScreenBackdrop';
import { ScreenWindow } from '../ScreenWindow';
import { SideNavLayout } from '../SideNavLayout';
import { useWorkspace } from './behavior/useWorkspace';
import { WorkspacePageView } from './sub-components/WorkspacePageView';
import { WorkspaceResults } from './sub-components/WorkspaceResults';
import type { WorkspaceScreenProps } from './WorkspaceScreen.type';
import './WorkspaceScreen.css';

const WorkspaceScreen = (props: WorkspaceScreenProps) => {
  const { title, onClose, backdrop = <ScreenBackdrop />, search, narrow, compactRows, readOnly, renderLock, subtitle, extra, floating, hidden, className } = props;
  const { pages, page, config, query, navSearch, flash, open } = useWorkspace(props);
  const look = { compactRows, readOnly, renderLock };
  useHeaderOptOutCheck('WorkspaceScreen', props);

  return (
    <ScreenWindow
      title={title}
      subtitle={subtitle}
      extra={extra}
      floating={floating}
      hidden={hidden}
      onClose={onClose}
      className={['workspace-screen', className].filter(Boolean).join(' ')}
    >
      <SideNavLayout
        narrow={narrow}
        paneScroll="none"
        nav={{ config, activeId: page?.id ?? '', onSelect: (id) => open(id), search: navSearch, defaultOpen: narrow !== true }}
        results={search === false ? undefined : <WorkspaceResults pages={pages} query={query} search={search ?? {}} onOpen={open} {...look} />}
      >
        {page !== undefined && <WorkspacePageView page={page} backdrop={backdrop} flash={flash} {...look} />}
      </SideNavLayout>
    </ScreenWindow>
  );
};

export { WorkspaceScreen };
