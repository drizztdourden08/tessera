/* @layer renderer-components @kind util */
import type { WizardApi, WizardValues } from '../../wizard.type';
import type { WizardNavProps } from '../../WizardNav/WizardNav.type';

const navProps = <V extends WizardValues>(wizard: WizardApi<V>, onCancel: () => void): WizardNavProps => {
  const { busyHint, extra, buttons } = wizard.current;
  return {
    isFirst: wizard.isFirst,
    isLast: wizard.isLast,
    canGoNext: wizard.invalid === null,
    busy: wizard.busy,
    hint: wizard.hint,
    busyHint: typeof busyHint === 'function' ? busyHint(wizard.values) : busyHint,
    extra: extra?.(wizard),
    buttons,
    onCancel,
    onBack: wizard.goBack,
    onNext: wizard.goNext,
    onFinish: () => {
      void wizard.finish();
    },
  };
};

export { navProps };
