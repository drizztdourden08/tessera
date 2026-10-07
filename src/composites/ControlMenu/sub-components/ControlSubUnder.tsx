/* @layer renderer-components @kind component */
import { useContext, useRef } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Box } from '../../../primitives/Box';
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { ControlMenuContext } from '../behavior/control-menu-context';
import { subWidthStyle } from '../behavior/sub-width-style';
import { useFitFallback } from '../behavior/useFitFallback';
import { useSubPanelLife } from '../behavior/useSubPanelLife';
import type { ControlSubPanelProps } from '../ControlMenu.type';

const ControlSubUnder = (props: ControlSubPanelProps) => {
  const { id, anchorRef, label, focus, onBack, children } = props;
  const panelRef = useRef<HTMLDivElement>(null);
  const { look, data } = useContext(ControlMenuContext);
  useSubPanelLife(panelRef, anchorRef, focus, onBack);
  useFitFallback(() => panelRef.current);
  const anchor = anchorRef.current;
  const row = anchor?.getBoundingClientRect();

  return (
    <Anchored
      ref={panelRef}
      id={id}
      role="group"
      aria-label={label}
      anchorRef={anchorRef}
      {...data}
      placement="bottom-start"
      flip
      style={anchor && row ? subWidthStyle(row.width / cssZoomOf(anchor)) : undefined}
      className={`dropdown-menu dropdown-surface control-menu__sub-panel control-menu__sub-panel--under ${look}`}
    >
      <Box className="control-menu__body">{children}</Box>
    </Anchored>
  );
};

export { ControlSubUnder };
