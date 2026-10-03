/* @layer renderer-components @kind component */
import { Glyph } from '../../../primitives/Glyph';
import { IconButton } from '../../../primitives/IconButton';
import type { ConfirmIconButtonAskProps } from './ConfirmIconButtonAsk.type';

const ConfirmIconButtonAsk = (props: ConfirmIconButtonAskProps) => {
  const { placement, focusCancel, confirmLabel, cancelLabel, onConfirm, onCancel } = props;
  const cancel = (
    <IconButton key="cancel" autoFocus={focusCancel} variant="danger" label={cancelLabel} title={cancelLabel} onClick={onCancel}>
      <Glyph name="close" size={13} strokeWidth={1.8} />
    </IconButton>
  );
  const confirm = (
    <IconButton key="confirm" variant="secondary" label={confirmLabel} title={confirmLabel} onClick={onConfirm}>
      <Glyph name="check" size={13} strokeWidth={1.8} />
    </IconButton>
  );
  return placement === 'end' ? [confirm, cancel] : [cancel, confirm];
};

export { ConfirmIconButtonAsk };
