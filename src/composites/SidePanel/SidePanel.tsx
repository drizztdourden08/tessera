/* @layer renderer-components @kind component */
import { useId } from 'react';
import type { CSSProperties } from 'react';
import { Box } from '../../primitives/Box';
import { CollapseToggle } from '../CollapseToggle';
import { usePaneFold } from '../pane-fold/usePaneFold';
import { usePaneSize } from '../ResizeHandle/behavior/usePaneSize';
import { sidePanelClass } from './behavior/side-panel-class';
import { sidePanelOptionsOf } from './behavior/side-panel-options-of';
import { SidePanelHandle } from './sub-components/SidePanelHandle';
import { SidePanelPane } from './sub-components/SidePanelPane';
import type { SidePanelProps } from './SidePanel.type';
import './SidePanel.css';

const SidePanel = (props: SidePanelProps) => {
  const { title, children, side = 'start', level = 2, actions, rail, className } = props;
  const paneId = useId();
  const options = sidePanelOptionsOf(props);
  const { collapsible } = options.fold;
  const fold = usePaneFold(options.fold);
  const size = usePaneSize(options.width);
  const { collapsed } = fold;
  const handled = options.resizable && !collapsed;
  const width = { '--side-panel-width': `${size.size}px` } as CSSProperties;
  const look = { side, collapsible, collapsed, dragging: size.dragging };

  return (
    <Box className={sidePanelClass(look, className)} style={width}>
      {collapsible && (
        <CollapseToggle
          ref={fold.toggleRef}
          collapsed={collapsed}
          onToggle={fold.toggle}
          label={title}
          side={side}
          controls={paneId}
          className="side-panel__toggle"
        />
      )}
      <SidePanelPane id={paneId} title={title} side={side} level={level} actions={actions} rail={rail} fold={fold}>
        {children}
      </SidePanelPane>
      {handled
        ? <SidePanelHandle handle={size.handle} side={side} title={title} controls={paneId} onCollapse={fold.collapse} />
        : <Box className="side-panel__line" aria-hidden="true" />}
    </Box>
  );
};

export { SidePanel };
