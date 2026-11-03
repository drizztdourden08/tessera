/* @layer renderer-components @kind types */
interface ResetButtonProps {
  label: string;
  onReset?: () => void;
  changed?: boolean;
}

export type { ResetButtonProps };
