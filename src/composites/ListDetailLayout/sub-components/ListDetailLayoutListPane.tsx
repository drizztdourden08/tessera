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
      surface="sunken"
      className={`${paneClass('list', { scroll, empty: false, folded: collapsed })}${heading ? '' : ' list-detail-layout__list--header-hidden'}`}
    >
      <PaneRail rail={{ label, side: 'start', onUnfold, action: collapsed ? action : undefined, items: collapsed ? railItems : [] }} aria-hidden={!collapsed} inert={!collapsed} />
      {heading && <Box aria-hidden={collapsed} inert={collapsed} className="list-detail-layout__list-heading"><CardHeader title={showTitle ? label : ''} actions={action} level={2} /></Box>}
      {scroll
        ? <ScrollArea aria-hidden={collapsed} inert={collapsed} scrollbar="slim" className="list-detail-layout__list-content">{content}</ScrollArea>
        : <Box aria-hidden={collapsed} inert={collapsed} className="list-detail-layout__list-content list-detail-layout__list-content--clip">{content}</Box>}
    </Box>
  );
};

export { ListDetailLayoutListPane };
