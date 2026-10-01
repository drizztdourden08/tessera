/* @layer renderer-components @kind types */
interface WizardExitOptions {
  dirty: boolean;
  busy: boolean;
  onExit: () => void;
}

interface WizardExit {
  requestExit: () => void;
  guard: { open: boolean; blocked: boolean; onDiscard: () => void; onStay: () => void };
}

export type { WizardExit, WizardExitOptions };
