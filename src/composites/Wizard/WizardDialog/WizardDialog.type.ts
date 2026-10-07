/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { DataAttributes } from '../../../primitives/dom/data-attributes.type';
import type { WizardValues } from '../wizard.type';
import type { WizardProps } from '../Wizard/Wizard.type';

interface WizardDialogProps<V extends WizardValues> extends Omit<WizardProps<V>, 'title'> {
  open: boolean;
  title?: ReactNode;
  id?: string;
  data?: DataAttributes;
}

export type { WizardDialogProps };
