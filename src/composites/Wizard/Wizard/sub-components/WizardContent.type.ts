/* @layer renderer-components @kind types */
import type { WizardValues } from '../../wizard.type';
import type { WizardProps } from '../Wizard.type';

type WizardContentProps<V extends WizardValues> = Omit<WizardProps<V>, 'onExit'> & {
  onCancel: () => void;
  showTitle: boolean;
};

export type { WizardContentProps };
