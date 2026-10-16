/* @layer renderer-components @kind component */
import { useId } from 'react';
import type { CSSProperties } from 'react';
import { Box } from '../../primitives/Box';
import { usePaneFold } from '../pane-fold/usePaneFold';
import { usePaneSize } from '../ResizeHandle/behavior/usePaneSize';
import { sidePanelClass } from './behavior/side-panel-class';
import { sidePanelOptionsOf } from './behavior/side-panel-options-of';
import { SidePanelHandle } from './sub-components/SidePanelHandle';
import { SidePanelPane } from './sub-components/SidePanelPane';
import type { SidePanelProps } from './SidePanel.type';
import './SidePanel.css';

const SidePanel = (props: SidePanelProps) => {
  const { title, children, side = 'start', level = 2, actions, className } = props;
  const paneId = useId();
  const options = sidePanelOptionsOf(props);
  const fold = usePaneFold(options.fold);
  const size = usePaneSize(options.width);
  const { collapsed } = fold;
  const handle = options.resizable && !collapsed && (
    <SidePanelHandle handle={size.handle} side={side} title={title} controls={paneId} onCollapse={fold.collapse} />
  );
  const width = { '--side-panel-width': `${size.size}px` } as CSSProperties;

  return (
    <Box className={sidePanelClass({ side, collapsed, dragging: size.dragging }, className)} style={width}>
      {side === 'end' && handle}
      <SidePanelPane id={paneId} title={title} side={side} level={level} actions={actions} collapsible={options.fold.collapsible} fold={fold}>
        {children}
      </SidePanelPane>
      {side === 'start' && handle}
    </Box>
  );
};

export { SidePanel };
