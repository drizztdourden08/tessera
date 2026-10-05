/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Dialog } from '../../Dialog';
import type { WizardExitGuardProps } from './WizardExitGuard.type';

const WizardExitGuard = (props: WizardExitGuardProps) => {
  const { common, wizard } = useTesseraStrings();
  const {
    open, blocked = false, onDiscard, onStay,
    title = common.unsavedTitle, message = wizard.discardMessage, discardLabel = common.discard, stayLabel = common.keepEditing,
  } = props;
  if (blocked) {
    return (
      <Dialog open={open} title={wizard.busyTitle} message={wizard.busyMessage} confirmLabel={wizard.busyConfirm} hideCancel onConfirm={onStay} onCancel={onStay} />
    );
  }
  return (
    <Dialog
      open={open}
      variant="danger"
      title={title}
      message={message}
      confirmLabel={discardLabel}
      cancelLabel={stayLabel}
      onConfirm={onDiscard}
      onCancel={onStay}
    />
  );
};

export { WizardExitGuard };
