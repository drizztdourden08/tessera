/* @layer renderer-components @kind component */
import { useId } from 'react';
import type { CSSProperties } from 'react';
import { Box } from '../../primitives/Box';
import { paneEdgeOf } from '../pane-edge/pane-edge-of';
import { PaneEdge } from '../pane-edge/PaneEdge';
import { usePaneFold } from '../pane-edge/usePaneFold';
import { usePaneSize } from '../ResizeHandle/behavior/usePaneSize';
import { sidePanelClass } from './behavior/side-panel-class';
import { sidePanelOptionsOf } from './behavior/side-panel-options-of';
import { SidePanelPane } from './sub-components/SidePanelPane';
import type { SidePanelProps } from './SidePanel.type';
import './SidePanel.css';

const SidePanel = (props: SidePanelProps) => {
  const { title, side = 'start', level = 2, showTitle = true, action, railItems = [], containers, className } = props;
  const paneId = useId();
  const options = sidePanelOptionsOf(props);
  const fold = usePaneFold(options.fold);
  const size = usePaneSize(options.width);
  const { handle } = paneEdgeOf({ edge: side, size, fold });
  const width = { '--side-panel-width': `${size.size}px` } as CSSProperties;
  const look = { side, collapsible: options.fold.collapsible, collapsed: fold.collapsed, dragging: size.dragging, showHeader: showTitle || action !== undefined };
  const pane = { fold, collapsible: options.fold.collapsible, id: paneId, label: title };

  return (
    <Box className={sidePanelClass(look, className)} style={width}>
      <SidePanelPane id={paneId} title={title} side={side} level={level} showTitle={showTitle} action={action} railItems={railItems} containers={containers} fold={fold} />
      <PaneEdge handle={handle} start={side === 'start' ? pane : undefined} end={side === 'end' ? pane : undefined} className="side-panel__edge" />
    </Box>
  );
};

export { SidePanel };
