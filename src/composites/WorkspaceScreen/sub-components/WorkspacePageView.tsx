/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { ScrollArea } from '../../../primitives/ScrollArea';
import { SettingsPage } from '../../SettingsPage';
import { anchorsOf } from '../behavior/anchors-of';
import { WorkspacePageBody } from './WorkspacePageBody';
import type { WorkspacePageViewProps } from './WorkspacePageView.type';
import '../../../theme/page-card.css';

const WorkspacePageView = (props: WorkspacePageViewProps) => {
  const { page, header, backdrop, ...look } = props;
  const anchors = useMemo(() => anchorsOf(page), [page]);
  const body = <WorkspacePageBody page={page} {...look} />;
  if (!header) return <ScrollArea className="workspace-screen__plain page-card">{body}</ScrollArea>;
  return (
    <SettingsPage
      key={page.id}
      icon={page.icon}
      title={page.title}
      backdrop={page.backdrop ?? backdrop}
      anchors={page.tabs === undefined ? anchors : undefined}
      tabs={page.tabs}
      actions={page.actions}
      scroll={page.scroll}
    >
      {body}
    </SettingsPage>
  );
};

export { WorkspacePageView };
