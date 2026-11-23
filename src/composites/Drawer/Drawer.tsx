/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { Overlay } from '../../primitives/Overlay';
import { Portal } from '../../primitives/Portal';
import { useDialogEscape } from '../DialogShell/behavior/useDialogEscape';
import { useDialogFocus } from '../DialogShell/behavior/useDialogFocus';
import './Drawer.css';
import { drawerClass } from './behavior/drawer-class';
import { DrawerBody } from './sub-components/DrawerBody';
import { DrawerHeader } from './sub-components/DrawerHeader';
import type { DrawerProps } from './Drawer.type';

const Drawer = (props: DrawerProps) => {
  const { open, onClose, side, size, look, label, eyebrow, title, titleWrap, stackNarrow, subtitle, headerActions, headerActionsRow, actions, children } = props;
  const titleId = useId();
  const labelledBy = label === undefined && title !== undefined ? titleId : undefined;
  const focus = useDialogFocus({ open, initialFocus: 'first', headingId: title === undefined ? undefined : titleId });
  useDialogEscape(open ? focus.node : null, true, onClose);

  return (
    <Portal layer="modal">
      <Box className={drawerClass(side ?? 'right', size, open, look)} aria-hidden={!open} inert={!open}>
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
          <DrawerBody split={look === 'split'} actions={actions}>{children}</DrawerBody>
        </Box>
      </Box>
    </Portal>
  );
};

export { Drawer };
