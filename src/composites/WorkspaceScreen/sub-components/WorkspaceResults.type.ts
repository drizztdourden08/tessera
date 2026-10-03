/* @layer renderer-components @kind types */
import type { WorkspacePage, WorkspaceRowLook, WorkspaceSearch } from '../WorkspaceScreen.type';

interface WorkspaceResultsProps extends WorkspaceRowLook {
  pages: readonly WorkspacePage[];
  query: string;
  search: WorkspaceSearch;
  onOpen: (id: string, row?: string) => void;
}

export type { WorkspaceResultsProps };
