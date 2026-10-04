/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { useDismissListeners } from '../../../primitives/Portal';
import { MenuContext } from '../behavior/menu-context';
import { menuColumns } from '../behavior/menu-columns';
import { useJoinedPanel } from '../behavior/useJoinedPanel';
import { MenuNodes } from './MenuNodes';
import { MenuPanel } from './MenuPanel';
import { SubMenuJoinPieces } from './SubMenuJoinPieces';
import type { SubMenuPanelProps } from './SubMenuPanel.type';
import '../../../theme/dropdown-sub-menu.css';

const stay = (): void => undefined;

const SubMenuPanel = (props: SubMenuPanelProps) => {
  const { id, anchorRef, label, start, nodes, onBack } = props;
  const { panelRef, pieces, place } = useJoinedPanel(anchorRef);
  const { look } = useContext(MenuContext);
  useDismissListeners({ open: true, onClose: stay, contentRef: panelRef, triggerRef: anchorRef, escape: false });

  return (
    <Anchored
      ref={panelRef}
      anchorRef={anchorRef}
      placement="right-start"
      flip={false}
      className={`dropdown-menu dropdown-menu--sub dropdown-surface ${look}`}
      {...place}
    >
      <SubMenuJoinPieces {...pieces} />
      <MenuPanel id={id} label={label} start={start} columns={menuColumns(nodes)} onBack={onBack}>
        <MenuNodes nodes={nodes} />
      </MenuPanel>
    </Anchored>
  );
};

export { SubMenuPanel };
