/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { joinStyle } from '../behavior/join-style';
import { menuColumns } from '../behavior/menu-columns';
import { useSubMenuJoin } from '../behavior/useSubMenuJoin';
import { MenuNodes } from './MenuNodes';
import { MenuPanel } from './MenuPanel';
import { SubMenuJoinPieces } from './SubMenuJoinPieces';
import type { SubMenuPanelProps } from './SubMenuPanel.type';
import './SubMenuPanel.css';

const SubMenuPanel = (props: SubMenuPanelProps) => {
  const { id, anchorRef, label, start, nodes, onBack } = props;
  const panelRef = useRef<HTMLDivElement>(null);
  const { join, native } = useSubMenuJoin(anchorRef, panelRef);

  return (
    <Anchored
      ref={panelRef}
      anchorRef={anchorRef}
      placement="right-start"
      flip={false}
      portal={false}
      fallback={join && !native ? { top: join.top, left: join.left } : null}
      className="dropdown-menu dropdown-menu--sub dropdown-surface"
      data-join-side={join?.side}
      style={join ? joinStyle(join, native) : undefined}
    >
      {join && <SubMenuJoinPieces join={join} />}
      <MenuPanel id={id} label={label} start={start} columns={menuColumns(nodes)} onBack={onBack}>
        <MenuNodes nodes={nodes} />
      </MenuPanel>
    </Anchored>
  );
};

export { SubMenuPanel };
