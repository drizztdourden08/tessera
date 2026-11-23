/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { Card } from '../../primitives/Card';
import { ButtonRow } from '../../primitives/ButtonRow';
import { Overlay } from '../../primitives/Overlay';
import { Portal } from '../../primitives/Portal';
import { ScrollArea } from '../../primitives/ScrollArea';
import { useDialogEscape } from '../DialogShell/behavior/useDialogEscape';
import { useDialogFocus } from '../DialogShell/behavior/useDialogFocus';
import './Drawer.css';
import { drawerClass } from './behavior/drawer-class';
import { DrawerHeader } from './sub-components/DrawerHeader';
import type { DrawerProps } from './Drawer.type';

const Drawer = (props: DrawerProps) => {
  const { open, onClose, side = 'right', size, look, label, eyebrow, title, titleWrap, stackNarrow, subtitle, headerActions, headerActionsRow, actions, children } = props;
  const titleId = useId();
  const labelledBy = label === undefined && title !== undefined ? titleId : undefined;
  const focus = useDialogFocus({ open, initialFocus: 'first', headingId: title === undefined ? undefined : titleId });
  useDialogEscape(open ? focus.node : null, true, onClose);

  const hasHeader = title !== undefined || subtitle !== undefined || eyebrow !== undefined;
  const split = look === 'split';
  const head = (
    <DrawerHeader
      look={look}
      eyebrow={eyebrow}
      title={title}
      titleWrap={titleWrap}
      stackNarrow={stackNarrow}
      titleId={titleId}
      subtitle={subtitle}
      headerActions={headerActions}
      headerActionsRow={headerActionsRow}
      onClose={onClose}
    />
  );
  const header = split && hasHeader ? <Card surface="glass" flush className="drawer__head-card">{head}</Card> : head;
  const content = (
    <>
      <ScrollArea className="drawer__body">{children}</ScrollArea>
      {actions !== undefined && <ButtonRow className="drawer__actions">{actions}</ButtonRow>}
    </>
  );
  const body = split ? <Card surface="glass" flush className="drawer__body-card">{content}</Card> : content;

  return (
    <Portal layer="modal">
      <Box className={drawerClass(side, size, open, look)} aria-hidden={!open} inert={!open}>
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
          {header}
          {body}
        </Box>
      </Box>
    </Portal>
  );
};

export { Drawer };
