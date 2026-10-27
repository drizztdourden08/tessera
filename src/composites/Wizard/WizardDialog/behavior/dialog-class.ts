/* @layer renderer-components @kind util */
import type { WizardDialogSize } from '../WizardDialog.type';

const wizardDialogClass = (size: WizardDialogSize, className: string): string =>
  ['wizard-dialog', `wizard-dialog--${size}`, className].filter(Boolean).join(' ');

export { wizardDialogClass };
