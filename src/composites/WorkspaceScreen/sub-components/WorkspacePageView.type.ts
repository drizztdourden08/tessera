/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WorkspacePage, WorkspaceRowLook } from '../WorkspaceScreen.type';

interface WorkspacePageViewProps extends WorkspaceRowLook {
  page: WorkspacePage;
  header: boolean;
  backdrop: ReactNode;
  flash?: string;
}

export type { WorkspacePageViewProps };
