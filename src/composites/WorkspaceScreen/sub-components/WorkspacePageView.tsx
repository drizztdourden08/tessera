/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { SettingsPage } from '../../SettingsPage';
import { anchorsOf } from '../behavior/anchors-of';
import { WorkspacePageBody } from './WorkspacePageBody';
import type { WorkspacePageViewProps } from './WorkspacePageView.type';

const WorkspacePageView = (props: WorkspacePageViewProps) => {
  const { page, backdrop, ...look } = props;
  const anchors = useMemo(() => anchorsOf(page), [page]);
  return (
    <SettingsPage
      key={page.id}
      icon={page.icon}
      title={page.title}
      backdrop={page.backdrop === undefined ? backdrop : page.backdrop}
      anchors={page.tabs === undefined ? anchors : undefined}
      tabs={page.tabs}
      actions={page.actions}
      scroll={page.scroll}
    >
      <WorkspacePageBody page={page} {...look} />
    </SettingsPage>
  );
};

export { WorkspacePageView };
