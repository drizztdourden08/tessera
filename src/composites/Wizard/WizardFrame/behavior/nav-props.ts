/* @layer renderer-components @kind util */
import type { WizardApi, WizardValues } from '../../wizard.type';
import type { WizardNavProps } from '../../WizardNav/WizardNav.type';
import type { WizardFrameProps } from '../WizardFrame.type';

const navProps = <V extends WizardValues>(
  wizard: WizardApi<V>,
  onCancel: () => void,
  props: Pick<WizardFrameProps<V>, 'navExtra' | 'finishLabel' | 'busyLabel'>,
): WizardNavProps => ({
  isFirst: wizard.isFirst,
  isLast: wizard.isLast,
  canGoNext: wizard.invalid === null,
  busy: wizard.busy,
  hint: wizard.hint,
  extra: props.navExtra,
  onCancel,
  onBack: wizard.goBack,
  onNext: wizard.goNext,
  onFinish: () => {
    void wizard.finish();
  },
  finishLabel: props.finishLabel,
  busyLabel: props.busyLabel,
});

export { navProps };
