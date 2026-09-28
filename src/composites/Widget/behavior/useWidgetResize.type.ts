/* @layer renderer-components @kind types */
interface Size {
  width: number;
  height: number;
}

type Edge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export type { Edge, Size };
