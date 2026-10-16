/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface ToolGroup {
  id: string;
  label: string;
  content: ReactNode;
}

interface ToolGroupsProps {
  groups: readonly ToolGroup[];
  label?: string;
  compact?: boolean;
  className?: string;
}

export type { ToolGroup, ToolGroupsProps };
