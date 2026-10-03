/* @layer renderer-components @kind logic */
import type { SideNavConfig, SideNavItem } from '../../SideNav';
import type { WorkspaceContent, WorkspacePage } from '../WorkspaceScreen.type';

const itemOf = (page: WorkspacePage): SideNavItem => ({ id: page.id, label: page.title, icon: page.icon ?? null });

const navConfigOf = (content: WorkspaceContent): SideNavConfig => ({
  home: content.home === undefined ? undefined : itemOf(content.home),
  groups: content.groups.map((group) => ({ id: group.id, label: group.label, items: group.pages.map(itemOf) })),
});

export { navConfigOf };
