/* @layer renderer-components @kind types */
interface ViewOption {
  id: string;
  label: string;
}

interface GroupControlProps {
  options: readonly ViewOption[];
  value: string | null;
  onChange: (next: string | null) => void;
  label?: string;
  className?: string;
}

export type { GroupControlProps, ViewOption };
