/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WizardValues } from '../wizard.type';
import type { WizardFrameProps } from '../WizardFrame/WizardFrame.type';

interface WizardDialogProps<V extends WizardValues> extends Omit<WizardFrameProps<V>, 'title'> {
  open: boolean;
  title?: ReactNode;
}

export type { WizardDialogProps };
