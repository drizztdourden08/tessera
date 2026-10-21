/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { CardHeader } from '../../../primitives/Card/sub-components/CardHeader';
import { ScrollArea } from '../../../primitives/ScrollArea';
import { PanelContainer } from '../../PanelContainer';
import { PaneRail } from '../../pane-edge/PaneRail';
import type { SidePanelPaneProps } from './SidePanelPane.type';

const SidePanelPane = (props: SidePanelPaneProps) => {
  const { id, title, side, level, showTitle, action, railItems, containers, fold } = props;
  const { collapsed } = fold;
  const tools = action === undefined || collapsed ? undefined : <Box className="side-panel__tools">{action}</Box>;
  return (
    <Box as="aside" id={id} surface={collapsed ? undefined : 'sunken'} aria-label={title} className="side-panel__pane">
      {collapsed && <PaneRail rail={{ label: title, side, onUnfold: fold.toggle, action, items: railItems }} />}
      {(showTitle || action !== undefined) && <CardHeader title={showTitle ? title : ''} level={level} tone="primary" actions={tools} />}
      <ScrollArea scrollbar="slim" className="side-panel__body">
        {containers.map((container, index) => <PanelContainer key={index} {...container} className="side-panel__container">{container.content}</PanelContainer>)}
      </ScrollArea>
    </Box>
  );
};

export { SidePanelPane };
