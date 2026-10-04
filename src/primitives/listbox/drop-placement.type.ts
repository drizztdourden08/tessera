/* @layer renderer-components @kind types */
type DropAlign = 'start' | 'end' | 'auto';

interface DropOptions {
  fit?: boolean;
  align?: DropAlign;
}

interface DropPlacement {
  top: number;
  left: number;
  right: number;
  end: boolean;
  anchorWidth: number;
  dropUp: boolean;
  space: number;
  radius: number;
  maxWidth: number;
}

export type { DropAlign, DropOptions, DropPlacement };
