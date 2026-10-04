/* @layer renderer-components @kind component */
import { useContext, useId, useMemo, useRef, useState } from 'react';
import { Box } from '../../../primitives/Box';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { useHintTarget } from '../../../primitives/hint/useHintTarget';
import { ControlMenuContext } from '../behavior/control-menu-context';
import { matchesQuery } from '../behavior/matches-query';
import { subRoom } from '../behavior/sub-room';
import { SUB_MIN_ROOM } from '../ControlMenu.constants';
import type { ControlMenuSubProps } from '../ControlMenu.type';
import { ControlMenuGroup } from './ControlMenuGroup';
import { ControlSubPanel } from './ControlSubPanel';
import { ControlSubRow } from './ControlSubRow';
import { ControlSubUnder } from './ControlSubUnder';

const ControlMenuSub = (props: ControlMenuSubProps) => {
  const { label, icon, description, hint, children } = props;
  const context = useContext(ControlMenuContext);
  const panelId = useId();
  const rowRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<'hover' | 'focus' | null>(null);
  const leave = (): void => {
    const doc = ownerDocumentOf(rowRef.current);
    if (!doc.getElementById(panelId)?.contains(doc.activeElement)) setOpen(null);
  };
  const handlers = useHintTarget<HTMLElement>({ hint, handlers: { onMouseEnter: () => setOpen((now) => now ?? 'hover'), onMouseLeave: leave } });
  const whole = useMemo(() => ({ ...context, query: '' }), [context]);
  const filtering = context.query.trim() !== '';

  if (filtering) {
    const inner = matchesQuery(label, context.query) ? <ControlMenuContext value={whole}>{children}</ControlMenuContext> : children;
    return <ControlMenuGroup label={label}>{inner}</ControlMenuGroup>;
  }

  const back = (): void => {
    const doc = ownerDocumentOf(rowRef.current);
    const inside = doc.getElementById(panelId)?.contains(doc.activeElement) === true;
    setOpen(null);
    if (inside) rowRef.current?.querySelector<HTMLElement>('.control-menu__sub-row')?.focus();
  };
  const Panel = open && subRoom(rowRef.current) < SUB_MIN_ROOM ? ControlSubUnder : ControlSubPanel;

  return (
    <Box ref={rowRef} className="dropdown__submenu-trigger control-menu__sub" {...handlers}>
      <ControlSubRow label={label} icon={icon} description={description} open={open !== null} panelId={panelId} onOpen={() => setOpen('focus')} />
      {open && <Panel id={panelId} anchorRef={rowRef} label={label} focus={open === 'focus'} onBack={back}>{children}</Panel>}
    </Box>
  );
};

export { ControlMenuSub };
