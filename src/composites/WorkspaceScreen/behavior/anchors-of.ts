/* @layer renderer-components @kind logic */
import type { SettingsPageAnchor } from '../../SettingsPage';
import type { WorkspacePage } from '../WorkspaceScreen.type';

const anchorsOf = (page: WorkspacePage): SettingsPageAnchor[] =>
  (page.sections ?? []).flatMap((section) => (section.title === undefined ? [] : [{ id: section.id, label: section.title }]));

export { anchorsOf };
