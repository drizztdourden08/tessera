/* @layer renderer-components @kind types */
interface HeaderLabelProps {
  label: string;
  name: string;
  renaming: boolean;
  onKeep: (label: string) => void;
  onUndo: () => void;
}

export type { HeaderLabelProps };
