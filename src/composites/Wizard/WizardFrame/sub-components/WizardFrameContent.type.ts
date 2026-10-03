/* @layer renderer-components @kind types */
import type { WizardValues } from '../../wizard.type';
import type { WizardFrameProps } from '../WizardFrame.type';

type WizardFrameContentProps<V extends WizardValues> = Omit<WizardFrameProps<V>, 'onExit'> & {
  onCancel: () => void;
  showTitle: boolean;
};

export type { WizardFrameContentProps };
