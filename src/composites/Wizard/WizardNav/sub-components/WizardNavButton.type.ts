/* @layer renderer-components @kind types */
import type { ButtonVariant } from '../../../../primitives/Button/Button.type';
import type { WizardNavLook } from '../WizardNav.type';

interface WizardNavButtonProps {
  look: WizardNavLook;
  variant: ButtonVariant;
  side: 'start' | 'end';
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

export type { WizardNavButtonProps };
