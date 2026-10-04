/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Box } from '../../../primitives/Box';
import { useJoinedPanel } from '../../DropdownMenu/behavior/useJoinedPanel';
import { SubMenuJoinPieces } from '../../DropdownMenu/sub-components/SubMenuJoinPieces';
import { ControlMenuContext } from '../behavior/control-menu-context';
import { useSubPanelLife } from '../behavior/useSubPanelLife';
import type { ControlSubPanelProps } from '../ControlMenu.type';

const ControlSubPanel = (props: ControlSubPanelProps) => {
  const { id, anchorRef, label, focus, onBack, children } = props;
  const { panelRef, pieces, place } = useJoinedPanel(anchorRef);
  const { look } = useContext(ControlMenuContext);
  useSubPanelLife(panelRef, anchorRef, focus, onBack);

  return (
    <Anchored
      ref={panelRef}
      id={id}
      role="group"
      aria-label={label}
      anchorRef={anchorRef}
      placement="right-start"
      flip={false}
      className={`dropdown-menu dropdown-menu--sub dropdown-surface control-menu__sub-panel ${look}`}
      {...place}
    >
      <SubMenuJoinPieces {...pieces} />
      <Box className="control-menu__body">{children}</Box>
    </Anchored>
  );
};

export { ControlSubPanel };
