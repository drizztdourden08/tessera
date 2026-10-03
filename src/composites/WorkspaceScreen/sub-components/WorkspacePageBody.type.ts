/* @layer renderer-components @kind types */
import type { WorkspacePage, WorkspaceRowLook } from '../WorkspaceScreen.type';

interface WorkspacePageBodyProps extends WorkspaceRowLook {
  page: WorkspacePage;
  flash?: string;
}

export type { WorkspacePageBodyProps };
