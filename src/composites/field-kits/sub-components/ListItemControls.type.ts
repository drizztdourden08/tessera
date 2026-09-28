/* @layer renderer-components @kind types */
interface ListItemControlsProps {
  list: readonly unknown[];
  index: number;
  disabled: boolean;
  onChange: (next: readonly unknown[]) => void;
}

export type { ListItemControlsProps };
