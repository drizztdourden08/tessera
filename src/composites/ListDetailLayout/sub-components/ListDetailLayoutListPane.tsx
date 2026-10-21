/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { CardHeader } from '../../../primitives/Card/sub-components/CardHeader';
import { ScrollArea } from '../../../primitives/ScrollArea';
import { PanelContainer } from '../../PanelContainer';
import { PaneRail } from '../../pane-edge/PaneRail';
import { paneClass } from '../behavior/pane-class';
import type { ListDetailLayoutListPaneProps } from '../ListDetailLayout.type';

const ListDetailLayoutListPane = (props: ListDetailLayoutListPaneProps) => {
  const { id, collapsed, label, showTitle, action, railItems, containers, scroll, onUnfold } = props;
  const heading = showTitle || action !== undefined;
  const content = containers.map((container, index) => <PanelContainer key={index} {...container}>{container.content}</PanelContainer>);
  return (
    <Box
      id={id}
      surface={collapsed ? undefined : 'sunken'}
      className={`${paneClass('list', { scroll, empty: false, folded: collapsed })}${heading ? '' : ' list-detail-layout__list--header-hidden'}`}
    >
      {collapsed && <PaneRail rail={{ label, side: 'start', onUnfold, action, items: railItems }} />}
      {heading && <Box className="list-detail-layout__list-heading"><CardHeader title={showTitle ? label : ''} actions={action} level={2} /></Box>}
      {scroll
        ? <ScrollArea scrollbar="slim" className="list-detail-layout__list-content">{content}</ScrollArea>
        : <Box className="list-detail-layout__list-content list-detail-layout__list-content--clip">{content}</Box>}
    </Box>
  );
};

export { ListDetailLayoutListPane };
