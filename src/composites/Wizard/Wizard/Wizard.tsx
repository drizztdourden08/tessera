/* @layer renderer-components @kind component */
import { WizardExitGuard } from '../WizardExitGuard/WizardExitGuard';
import { useWizardExit } from '../WizardExitGuard/behavior/useWizardExit';
import { WizardContent } from './sub-components/WizardContent';
import type { WizardValues } from '../wizard.type';
import type { WizardProps } from './Wizard.type';

const Wizard = <V extends WizardValues>(props: WizardProps<V>) => {
  const { onExit, ...frame } = props;
  const exit = useWizardExit({ dirty: frame.wizard.dirty, busy: frame.wizard.busy, onExit });
  return (
    <>
      <WizardContent {...frame} onCancel={exit.requestExit} showTitle />
      <WizardExitGuard {...exit.guard} />
    </>
  );
};

export { Wizard };
