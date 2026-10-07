/* @layer renderer-components @kind component */
import { useContext, useId, useMemo, useRef } from 'react';
import { matchesText } from '../../../data/text/matches-text';
import { Box } from '../../../primitives/Box';
import { useHintTarget } from '../../../primitives/hint/useHintTarget';
import { ControlMenuContext } from '../behavior/control-menu-context';
import { subRoom } from '../behavior/sub-room';
import { useSubOpen } from '../behavior/useSubOpen';
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
  const { open, hover, focus, leave, back } = useSubOpen(rowRef, panelId);
  const handlers = useHintTarget<HTMLElement>({ hint, handlers: { onMouseEnter: hover, onMouseLeave: leave } });
  const whole = useMemo(() => ({ ...context, query: '' }), [context]);
  const filtering = context.query.trim() !== '';

  if (filtering) {
    const matched = matchesText(label, context.query);
    const inner = matched ? <ControlMenuContext value={whole}>{children}</ControlMenuContext> : children;
    return <ControlMenuGroup label={label} shown={matched}>{inner}</ControlMenuGroup>;
  }

  const Panel = open && subRoom(rowRef.current) < SUB_MIN_ROOM ? ControlSubUnder : ControlSubPanel;

  return (
    <Box ref={rowRef} className="dropdown__submenu-trigger control-menu__sub" {...handlers}>
      <ControlSubRow label={label} icon={icon} description={description} open={open !== null} panelId={panelId} onOpen={focus} />
      {open && <Panel id={panelId} anchorRef={rowRef} label={label} focus={open === 'focus'} onBack={back}>{children}</Panel>}
    </Box>
  );
};

export { ControlMenuSub };
