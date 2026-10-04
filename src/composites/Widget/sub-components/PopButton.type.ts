/* @layer renderer-components @kind types */
interface PopButtonProps {
  out: boolean;
  canPopOut: boolean;
  onPopOut?: () => void;
  name: string;
}

export type { PopButtonProps };
