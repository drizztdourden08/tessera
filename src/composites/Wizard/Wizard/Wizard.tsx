/* @layer renderer-components @kind component */
import { WizardExitGuard } from '../WizardExitGuard/WizardExitGuard';
import { useWizardExit } from '../WizardExitGuard/behavior/useWizardExit';
import { useBusyWizard } from './behavior/useBusyWizard';
import { WizardContent } from './sub-components/WizardContent';
import type { WizardValues } from '../wizard.type';
import type { WizardProps } from './Wizard.type';

const Wizard = <V extends WizardValues>(props: WizardProps<V>) => {
  const { onExit, busy, wizard: source, ...frame } = props;
  const wizard = useBusyWizard(source, busy);
  const exit = useWizardExit({ dirty: wizard.dirty, busy: wizard.busy, onExit });
  return (
    <>
      <WizardContent {...frame} wizard={wizard} onCancel={exit.requestExit} showTitle />
      <WizardExitGuard {...exit.guard} />
    </>
  );
};

export { Wizard };
