/* @layer renderer-components @kind types */
import type { WorkspaceScreenProps } from '../WorkspaceScreen.type';

type WorkspaceInput = Pick<WorkspaceScreenProps, 'content' | 'activeId' | 'defaultActiveId' | 'onActiveChange' | 'search'>;

export type { WorkspaceInput };
