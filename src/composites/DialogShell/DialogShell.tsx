/* @layer renderer-components @kind component */
import { useEffect, useId, useRef } from 'react';
import { Portal } from '../../primitives/Portal';
import { Box } from '../../primitives/Box';
import { WindowHeader } from '../WindowHeader';
import './DialogShell.css';
import { type DialogShellProps } from './DialogShell.type';

const DialogShell = (props: DialogShellProps) => {
  const { open, onClose, title, headerExtra, actions, className = '', dismissable = true, initialFocusRef, children } = props;

  const titleId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open || !dismissable) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onCloseRef.current(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, dismissable]);

  useEffect(() => {
    if (!open || dismissable) return;
    const swallow = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener('keydown', swallow, true);
    return () => document.removeEventListener('keydown', swallow, true);
  }, [open, dismissable]);

  useEffect(() => {
    if (!open) return;
    const active = document.activeElement;
    if (!active || active === document.body) {
      initialFocusRef?.current?.focus();
    }
  }, [open, initialFocusRef]);

  if (!open) return null;

  return (
    <Portal layer="modal">
      <Box className="dialog-backdrop" onClick={dismissable ? onClose : undefined}>
        <Box
          className={`dialog${className ? ` ${className}` : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          <WindowHeader title={title} titleId={titleId} extra={headerExtra} onClose={dismissable ? onClose : undefined} className="dialog__header" />
          {children}
          {actions && <Box className="dialog__actions">{actions}</Box>}
        </Box>
      </Box>
    </Portal>
  );
};

export { DialogShell };
