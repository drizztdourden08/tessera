/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { ButtonRow } from '../../primitives/ButtonRow';
import { ScrollArea } from '../../primitives/ScrollArea';
import { WindowHeader } from '../WindowHeader';
import './Drawer.css';
import type { DrawerProps } from './Drawer.type';

const Drawer = (props: DrawerProps) => {
  const { open, onClose, side = 'right', label, title, subtitle, actions, children } = props;
  const titleId = useId();
  const headed = title !== undefined || subtitle !== undefined;
  const labelledBy = label === undefined && title !== undefined ? titleId : undefined;

  return (
    <Box className={`drawer drawer--${side}${open ? ' drawer--open' : ''}`} aria-hidden={!open}>
      <Box className="drawer__scrim" onClick={onClose} />
      <Box className="drawer__panel" role="dialog" aria-modal="true" aria-label={label} aria-labelledby={labelledBy}>
        {headed && <WindowHeader title={title} titleId={titleId} subtitle={subtitle} onClose={onClose} className="drawer__header" />}
        <ScrollArea className="drawer__body">{children}</ScrollArea>
        {actions !== undefined && <ButtonRow className="drawer__actions">{actions}</ButtonRow>}
      </Box>
    </Box>
  );
};

export { Drawer };
