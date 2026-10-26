/* @layer renderer-components @kind types */
interface LinesEditInput {
  from: number;
  to: number;
  start: number;
  end: number;
  lines: string[];
  changed: string[];
}

export type { LinesEditInput };
