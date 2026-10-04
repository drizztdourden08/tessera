/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FilterClause } from '../../data/filter/clause';
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

type LogPanelHeight = 'fill' | number;

interface LogPanelProps {
  rows: readonly LogRow[];
  kinds?: readonly LogKindDef[];
  search?: string;
  onSearchChange?: (query: string) => void;
  filters?: readonly FilterClause[];
  onFiltersChange?: (next: readonly FilterClause[]) => void;
  toolbar?: boolean;
  copyText?: (shown: readonly LogRow[]) => string;
  countLabel?: string;
  emptyLabel?: string;
  toolbarExtra?: ReactNode;
  height?: LogPanelHeight;
  className?: string;
}

export type { LogKindDef, LogPanelHeight, LogPanelProps, LogRow };
