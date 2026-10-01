/* @layer renderer-components @kind types */
import type { WizardProgressStep } from '../WizardProgress.type';

interface WizardProgressCompactProps {
  steps: readonly WizardProgressStep[];
  current: number;
  label: string;
  className: string;
}

export type { WizardProgressCompactProps };
