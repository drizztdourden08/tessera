/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TextTone } from '../../primitives/TextElement';

interface LogRow {
  id: string;
  gutter: string;
  tag: string;
  kind: string;
  message: string;
  indent?: number;
}

interface LogKindDef {
  id: string;
  label: string;
  tone?: TextTone;
  toneMessage?: boolean;
}

interface LogPanelProps {
  rows: LogRow[];
  className?: string;
  kinds?: readonly LogKindDef[];
  hidden?: ReadonlySet<string>;
  onToggleKind?: (kind: string) => void;
  search?: string;
  onSearchChange?: (query: string) => void;
  copyText?: () => string;
  countLabel?: string;
  emptyLabel?: string;
  toolbarExtra?: ReactNode;
}

export type { LogKindDef, LogPanelProps, LogRow };
