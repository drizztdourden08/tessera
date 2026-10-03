/* @layer renderer-components @kind types */
import type { WizardNavLooks, WizardNavProps } from '../WizardNav.type';

type WizardNavButtonsProps = Pick<WizardNavProps, 'isFirst' | 'isLast' | 'canGoNext' | 'onCancel' | 'onBack' | 'onNext' | 'onFinish'> & {
  busy: boolean;
  looks: WizardNavLooks;
};

export type { WizardNavButtonsProps };
