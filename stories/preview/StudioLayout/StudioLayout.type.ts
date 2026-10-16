/* @layer stories @kind types */
import type { ReactNode } from 'react';

type StudioSide = 'start' | 'end';

interface StudioGroupSpec {
  id: string;
  label: string;
  content: ReactNode;
}

interface StudioPanelSpec {
  title: string;
  content: ReactNode;
  defaultFolded?: boolean;
}

interface StudioLayoutProps {
  bar?: ReactNode;
  start?: StudioPanelSpec;
  end?: StudioPanelSpec;
  children: ReactNode;
  className?: string;
}

interface StudioPanelProps {
  side: StudioSide;
  spec: StudioPanelSpec;
}

interface StudioGroupsProps {
  groups: readonly StudioGroupSpec[];
  className: string;
}

interface StudioBarProps {
  caption: string;
  title: ReactNode;
  status?: ReactNode;
  groups: readonly StudioGroupSpec[];
  idleHint: string;
}

interface StudioEditorProps {
  label: string;
  toolbar?: readonly StudioGroupSpec[];
  children: ReactNode;
}

export type { StudioBarProps, StudioEditorProps, StudioGroupsProps, StudioLayoutProps, StudioPanelProps };
