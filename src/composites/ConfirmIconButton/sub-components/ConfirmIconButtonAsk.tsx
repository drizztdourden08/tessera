/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import type { ConfirmIconButtonAskProps } from './ConfirmIconButtonAsk.type';

const ConfirmIconButtonAsk = (props: ConfirmIconButtonAskProps) => {
  const { placement, focusCancel, confirmLabel, cancelLabel, onConfirm, onCancel } = props;
  const cancel = (
    <IconButton key="cancel" autoFocus={focusCancel} variant="danger" label={cancelLabel} title={cancelLabel} onClick={onCancel}>
      <Icon name="x" size={13} className="confirm-icon-btn__mark" />
    </IconButton>
  );
  const confirm = (
    <IconButton key="confirm" variant="secondary" label={confirmLabel} title={confirmLabel} onClick={onConfirm}>
      <Icon name="check" size={13} className="confirm-icon-btn__mark" />
    </IconButton>
  );
  return placement === 'end' ? [confirm, cancel] : [cancel, confirm];
};

export { ConfirmIconButtonAsk };
