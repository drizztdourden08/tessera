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
    children,
  } = props;

  const confirmRef = useRef<HTMLButtonElement>(null);

  const actions = (
    <>
      {!hideCancel && <Button variant="tertiary" onClick={onCancel}>{cancelLabel}</Button>}
      <Button ref={confirmRef} variant={variant === 'danger' ? 'danger' : 'primary'} onClick={onConfirm} disabled={confirmDisabled}>
        {confirmLabel}
      </Button>
    </>
  );

  return (
    <DialogShell open={open} onClose={onCancel} title={title} actions={actions} initialFocusRef={confirmRef}>
      {message && <Paragraph tone="dim" className="dialog__message">{message}</Paragraph>}
      {children}
    </DialogShell>
  );
};

export {
  Dialog,
};
