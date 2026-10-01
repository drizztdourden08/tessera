/* @layer renderer-components @kind types */
import type { WizardNavLabels, WizardNavProps } from '../WizardNav.type';

type WizardNavButtonsProps = Pick<WizardNavProps, 'isFirst' | 'isLast' | 'canGoNext' | 'onCancel' | 'onBack' | 'onNext' | 'onFinish'> & {
  busy: boolean;
  labels: WizardNavLabels;
};

export type { WizardNavButtonsProps };
