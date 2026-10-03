/* @layer renderer-components @kind logic */
import type { WorkspaceContent, WorkspacePage } from '../WorkspaceScreen.type';

const pagesOf = (content: WorkspaceContent): WorkspacePage[] => [
  ...(content.home === undefined ? [] : [content.home]),
  ...content.groups.flatMap((group) => group.pages),
];

export { pagesOf };
