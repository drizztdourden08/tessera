/* @layer renderer-components @kind types */
interface WizardExitGuardProps {
  open: boolean;
  blocked?: boolean;
  onDiscard: () => void;
  onStay: () => void;
  title?: string;
  message?: string;
  discardLabel?: string;
  stayLabel?: string;
}

export type { WizardExitGuardProps };
