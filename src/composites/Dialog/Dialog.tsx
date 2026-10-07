/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Button } from '../../primitives/Button';
import { Paragraph } from '../../primitives/text-elements';
import { DialogShell } from '../DialogShell';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import './Dialog.css';
import { type DialogProps } from './Dialog.type';

const Dialog = (props: DialogProps) => {
  const { common } = useTesseraStrings();
  const {
    open,
    title,
    message,
    confirmLabel = common.confirm,
    cancelLabel = common.cancel,
    confirmDisabled = false,
    hideCancel = false,
    variant = 'default',
    onConfirm,
    onCancel,
    id,
    data,
    children,
  } = props;

  const confirmRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const danger = variant === 'danger';
  const start = danger ? { ref: cancelRef, mode: 'dialog' as const } : { ref: confirmRef, mode: 'first' as const };

  const actions = (
    <>
      {!hideCancel && <Button ref={cancelRef} variant="tertiary" onClick={onCancel}>{cancelLabel}</Button>}
      <Button ref={confirmRef} variant={danger ? 'danger' : 'primary'} onClick={onConfirm} disabled={confirmDisabled}>
        {confirmLabel}
      </Button>
    </>
  );

  return (
    <DialogShell
      open={open}
      onClose={onCancel}
      title={title}
      actions={actions}
      initialFocusRef={start.ref}
      initialFocus={start.mode}
      id={id}
      data={data}
    >
      {message && <Paragraph tone="dim" className="dialog__message">{message}</Paragraph>}
      {children}
    </DialogShell>
  );
};

export {
  Dialog,
};
