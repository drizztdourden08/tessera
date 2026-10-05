/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { MARK_SIZE } from '../ConfirmIconButton.constants';
import type { ConfirmIconButtonAskProps } from './ConfirmIconButtonAsk.type';

const ConfirmIconButtonAsk = (props: ConfirmIconButtonAskProps) => {
  const { placement, size = 'sm', focusCancel, confirmLabel, cancelLabel, onConfirm, onCancel } = props;
  const cancel = (
    <IconButton key="cancel" autoFocus={focusCancel} variant="ghost" size={size} label={cancelLabel} title={cancelLabel} onClick={onCancel}>
      <Icon name="x" size={MARK_SIZE[size]} className="confirm-icon-btn__mark" />
    </IconButton>
  );
  const confirm = (
    <IconButton key="confirm" variant="success" size={size} label={confirmLabel} title={confirmLabel} onClick={onConfirm}>
      <Icon name="check" size={MARK_SIZE[size]} className="confirm-icon-btn__mark" />
    </IconButton>
  );
  return placement === 'end' ? [confirm, cancel] : [cancel, confirm];
};

export { ConfirmIconButtonAsk };
