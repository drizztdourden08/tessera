/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { DataAttributes } from '../../../primitives/dom/data-attributes.type';
import type { WizardValues } from '../wizard.type';
import type { WizardProps } from '../Wizard/Wizard.type';

type WizardDialogSize = 'md' | 'wide' | 'lg' | 'xl';

interface WizardDialogProps<V extends WizardValues> extends Omit<WizardProps<V>, 'title'> {
  open: boolean;
  title?: ReactNode;
  size?: WizardDialogSize;
  id?: string;
  data?: DataAttributes;
}

export type { WizardDialogProps, WizardDialogSize };
