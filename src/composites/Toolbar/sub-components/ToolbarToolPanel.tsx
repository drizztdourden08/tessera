/* @layer renderer-components @kind component */
import { useContext, useRef } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { useFocusReturn } from '../../DropdownMenu/behavior/useFocusReturn';
import { panelPlacement } from '../behavior/panel-placement';
import { ToolbarContext } from '../behavior/toolbar-context';
import { useFocusIn } from '../behavior/useFocusIn';
import type { ToolbarToolPanelProps } from './ToolbarToolPanel.type';
import './ToolbarToolPanel.css';

const ToolbarToolPanel = ({ anchorRef, tool, label, render }: ToolbarToolPanelProps) => {
  const { orientation, menuSide } = useContext(ToolbarContext);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusIn(panelRef);
  useFocusReturn(panelRef, anchorRef);

  return (
    <Anchored
      ref={panelRef}
      anchorRef={anchorRef}
      placement={panelPlacement(orientation, menuSide)}
      layer="overlay"
      role="dialog"
      aria-label={label}
      tabIndex={-1}
      className="toolbar__panel"
      data-app-region="no-drag"
      onDismiss={tool.close}
    >
      {render(tool.close)}
    </Anchored>
  );
};

export { ToolbarToolPanel };
