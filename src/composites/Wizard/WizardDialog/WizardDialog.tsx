/* @layer renderer-components @kind component */
import { DialogShell } from '../../DialogShell';
import { WizardExitGuard } from '../WizardExitGuard/WizardExitGuard';
import { useWizardExit } from '../WizardExitGuard/behavior/useWizardExit';
import { WizardContent } from '../Wizard/sub-components/WizardContent';
import type { WizardValues } from '../wizard.type';
import type { WizardDialogProps } from './WizardDialog.type';
import './WizardDialog.css';

const WizardDialog = <V extends WizardValues>(props: WizardDialogProps<V>) => {
  const { open, onExit, title, headerExtra, className = '', id, data, ...frame } = props;
  const { wizard } = frame;
  const exit = useWizardExit({ dirty: wizard.dirty, busy: wizard.busy, onExit });
  const close = () => {
    if (!exit.guard.open) exit.requestExit();
  };
  return (
    <>
      <DialogShell open={open} onClose={close} dismissable={!wizard.busy} title={title} headerExtra={headerExtra} className={`wizard-dialog${className ? ` ${className}` : ''}`} id={id} data={data}>
        <WizardContent {...frame} onCancel={exit.requestExit} showTitle={false} />
      </DialogShell>
      <WizardExitGuard {...exit.guard} />
    </>
  );
};

export { WizardDialog };
