/* @layer renderer-components @kind component */
import { WizardExitGuard } from '../WizardExitGuard/WizardExitGuard';
import { useWizardExit } from '../WizardExitGuard/behavior/useWizardExit';
import { WizardFrameContent } from './sub-components/WizardFrameContent';
import type { WizardValues } from '../wizard.type';
import type { WizardFrameProps } from './WizardFrame.type';

const WizardFrame = <V extends WizardValues>(props: WizardFrameProps<V>) => {
  const { onExit, ...frame } = props;
  const exit = useWizardExit({ dirty: frame.wizard.dirty, busy: frame.wizard.busy, onExit });
  return (
    <>
      <WizardFrameContent {...frame} onCancel={exit.requestExit} showTitle />
      <WizardExitGuard {...exit.guard} />
    </>
  );
};

export { WizardFrame };
