/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../primitives/Title/Title.type';
import type { ToolGroup } from '../../primitives/ToolGroups/ToolGroups.type';
import type { SidePanelProps } from '../SidePanel/SidePanel.type';

interface StudioLayoutBar {
  title: ReactNode;
  caption?: ReactNode;
  status?: ReactNode;
  groups?: readonly ToolGroup[];
  idleHint?: string;
  notices?: ReactNode;
  level?: HeadingLevel;
}

type StudioLayoutPanel = Omit<SidePanelProps, 'side' | 'children' | 'className'> & { content: ReactNode };

interface StudioLayoutProps {
  editorLabel: string;
  children: ReactNode;
  bar?: StudioLayoutBar;
  banner?: ReactNode;
  start?: StudioLayoutPanel;
  end?: StudioLayoutPanel;
  toolbar?: readonly ToolGroup[];
  compactToolbar?: boolean;
  editorMinWidth?: number;
  className?: string;
}

export type { StudioLayoutBar, StudioLayoutPanel, StudioLayoutProps };
