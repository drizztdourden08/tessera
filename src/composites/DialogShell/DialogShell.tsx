/* @layer renderer-components @kind component */
import { useId } from 'react';
import type { MouseEvent } from 'react';
import { Portal } from '../../primitives/Portal';
import { Box } from '../../primitives/Box';
import { WindowHeader } from '../WindowHeader';
import { useDialogEscape } from './behavior/useDialogEscape';
import { useDialogFocus } from './behavior/useDialogFocus';
import './DialogShell.css';
import { type DialogShellProps } from './DialogShell.type';

const keepFocus = (event: MouseEvent<HTMLElement>): void => {
  if (event.target === event.currentTarget) event.preventDefault();
};

const DialogShell = (props: DialogShellProps) => {
  const {
    open, onClose, title, headerExtra, actions, className = '', dismissable = true, initialFocusRef, initialFocus = 'first', children,
  } = props;

  const titleId = useId();
  const focus = useDialogFocus({ open, initialFocusRef, initialFocus });
  useDialogEscape(focus.node, dismissable, onClose);

  if (!open) return null;

  return (
    <Portal layer="modal">
      <Box className="dialog-backdrop" onMouseDown={keepFocus} onClick={dismissable ? onClose : undefined}>
        <Box
          ref={focus.ref}
          className={`dialog${className ? ` ${className}` : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          tabIndex={-1}
          onKeyDown={focus.onKeyDown}
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
