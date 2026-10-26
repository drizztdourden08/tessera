/* @layer renderer-components @kind types */
interface FocusTarget {
  value: string;
  focus: () => void;
  setSelectionRange: (start: number, end: number) => void;
}

export type { FocusTarget };
