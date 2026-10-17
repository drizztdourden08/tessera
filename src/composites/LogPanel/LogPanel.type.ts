/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FilterClause } from '../../data/filter/clause';
import type { TagCategoryColor, TagCustomColor } from '../../primitives/Tag';
import type { TextTone } from '../../primitives/TextElement';

interface LogRow {
  id: string;
  gutter: string;
  tag: string;
  kind: string;
  message: string;
  indent?: number;
}

type LogKindTone = TextTone | TagCategoryColor | TagCustomColor;

interface LogKindDef {
  id: string;
  label: string;
  tone?: LogKindTone;
  toneMessage?: boolean | LogKindTone;
  strong?: boolean;
  uppercase?: boolean;
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
  selectedIds?: ReadonlySet<string>;
  onSelectionChange?: (ids: ReadonlySet<string>) => void;
  className?: string;
}

export type { LogKindDef, LogKindTone, LogPanelHeight, LogPanelProps, LogRow };
