/* @layer renderer-components @kind component */
import { DialogShell } from '../../DialogShell';
import { WizardExitGuard } from '../WizardExitGuard/WizardExitGuard';
import { useWizardExit } from '../WizardExitGuard/behavior/useWizardExit';
import { useBusyWizard } from '../Wizard/behavior/useBusyWizard';
import { WizardContent } from '../Wizard/sub-components/WizardContent';
import type { WizardValues } from '../wizard.type';
import { wizardDialogClass } from './behavior/dialog-class';
import type { WizardDialogProps } from './WizardDialog.type';
import './WizardDialog.css';

const WizardDialog = <V extends WizardValues>(props: WizardDialogProps<V>) => {
  const { open, onExit, title, headerExtra, size = 'wide', className = '', id, data, busy, wizard: source, ...frame } = props;
  const wizard = useBusyWizard(source, busy);
  const exit = useWizardExit({ dirty: wizard.dirty, busy: wizard.busy, onExit });
  const close = () => {
    if (!exit.guard.open) exit.requestExit();
  };
  return (
    <>
      <DialogShell open={open} onClose={close} dismissable={!wizard.busy} title={title} headerExtra={headerExtra} className={wizardDialogClass(size, className)} id={id} data={data}>
        <WizardContent {...frame} wizard={wizard} onCancel={exit.requestExit} showTitle={false} />
      </DialogShell>
      <WizardExitGuard {...exit.guard} />
    </>
  );
};

export { WizardDialog };
