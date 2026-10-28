/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ToolbarColumns } from '../Toolbar.type';

interface FitCell {
  size: number;
  span: boolean;
}

interface FitSpace {
  gap: number;
  room: number;
  columns: number;
}

interface FitShape {
  vertical: boolean;
  columns: ToolbarColumns;
}

interface ToolbarFit {
  fit: number;
  wrapped: boolean;
}

interface ToolbarFitParams {
  barRef: RefObject<HTMLElement | null>;
  measureRef: RefObject<HTMLElement | null>;
  restCount: number;
  contentKey: string;
  vertical: boolean;
  columns: ToolbarColumns;
}

export type { FitCell, FitShape, FitSpace, ToolbarFit, ToolbarFitParams };
