/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { ButtonRow } from '../../primitives/ButtonRow';
import { Overlay } from '../../primitives/Overlay';
import { ScrollArea } from '../../primitives/ScrollArea';
import { useDialogEscape } from '../DialogShell/behavior/useDialogEscape';
import { useDialogFocus } from '../DialogShell/behavior/useDialogFocus';
import { WindowHeader } from '../WindowHeader';
import './Drawer.css';
import type { DrawerProps } from './Drawer.type';

const Drawer = (props: DrawerProps) => {
  const { open, onClose, side = 'right', label, title, subtitle, actions, children } = props;
  const titleId = useId();
  const headed = title !== undefined || subtitle !== undefined;
  const labelledBy = label === undefined && title !== undefined ? titleId : undefined;
  const focus = useDialogFocus({ open, initialFocus: 'first', headingId: title === undefined ? undefined : titleId });
  useDialogEscape(open ? focus.node : null, true, onClose);

  return (
    <Box className={`drawer drawer--${side}${open ? ' drawer--open' : ''}`} aria-hidden={!open} inert={!open}>
      <Overlay visible={open} keepMounted tone="scrim" onClick={onClose} className="drawer__scrim" />
      <Box
        ref={focus.ref}
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onKeyDown={focus.onKeyDown}
      >
        {headed && <WindowHeader title={title} titleId={titleId} subtitle={subtitle} onClose={onClose} className="drawer__header" />}
        <ScrollArea className="drawer__body">{children}</ScrollArea>
        {actions !== undefined && <ButtonRow className="drawer__actions">{actions}</ButtonRow>}
      </Box>
    </Box>
  );
};

export { Drawer };
