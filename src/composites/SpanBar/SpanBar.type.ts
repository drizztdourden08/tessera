/* @layer renderer-components @kind types */
import type { MouseEvent, ReactNode } from 'react';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
import type { TagCategoryColor } from '../../primitives/Tag';
import type { CellGeometry, CellSpan } from '../cell-geometry';

type SpanSnap = 'cell' | 'none';

interface SpanBarProps {
  start: number;
  end: number;
  cells: CellGeometry;
  count?: number;
  onChange?: (span: CellSpan) => void;
  onDraft?: (span: CellSpan | null) => void;
  label?: string;
  readOnly?: boolean;
  selected?: boolean;
  onSelect?: (event: MouseEvent<HTMLElement>) => void;
  onActivate?: () => void;
  announce?: (text: string) => void;
  snap?: SpanSnap;
  minLength?: number;
  colour?: TagCategoryColor;
  tint?: string;
  data?: DataAttributes;
  className?: string;
  children?: ReactNode;
}

export type { SpanBarProps, SpanSnap };
