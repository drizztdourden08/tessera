/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { EmptyState } from '../../primitives/EmptyState';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PaneEdge } from '../pane-edge/PaneEdge';
import { PaneRail } from '../pane-edge/PaneRail';
import { layoutClass } from './behavior/layout-class';
import { isPaired } from './behavior/is-paired';
import { labelsOf } from './behavior/labels-of';
import { layoutOptionsOf } from './behavior/layout-options-of';
import { paneClass } from './behavior/pane-class';
import { useListDetailPanes } from './behavior/useListDetailPanes';
import { ListDetailLayoutBack } from './sub-components/ListDetailLayoutBack';
import { ListDetailLayoutListPane } from './sub-components/ListDetailLayoutListPane';
import type { ListDetailLayoutProps } from './ListDetailLayout.type';
import './ListDetailLayout.css';

const ListDetailLayout = (props: ListDetailLayoutProps) => {
  const { listContainers, detail, emptyDetail, onBack, className, listShowTitle = true, listAction, listRailItems = [], detailRailItems = [] } = props;
  const { navigation, lists } = useTesseraStrings();
  const listId = useId();
  const detailId = useId();
  const options = layoutOptionsOf(props);
  const { view, empty, scroll } = options;
  const panes = useListDetailPanes(options);
  const { listFold, detailFold } = panes;
  const labels = labelsOf(props, { list: navigation.listPane, detail: navigation.detailPane, back: navigation.back });
  const { list: listLabel, detail: detailLabel } = labels;
  const look = { collapsed: listFold.collapsed, detailCollapsed: detailFold.collapsed, dragging: panes.dragging, paired: isPaired(options.collapse, options.detailCollapse, { list: listFold, detail: detailFold }) };

  return (
    <Box className={layoutClass(look, className)}>
      <Box ref={panes.panesRef} className={`list-detail-layout__panes pane-edge-host${options.ratio ? ' list-detail-layout__panes--ratio' : ''}`} data-view={view} style={{ gridTemplateColumns: panes.columns }}>
        <ListDetailLayoutListPane
          id={listId}
          collapsed={listFold.collapsed}
          label={listLabel}
          showTitle={listShowTitle}
          action={listAction}
          railItems={listRailItems}
          containers={listContainers}
          scroll={scroll.list}
          onUnfold={listFold.toggle}
        />
        <PaneEdge
          handle={panes.handle}
          start={{ fold: listFold, collapsible: options.collapse.collapsible, id: listId, label: listLabel }}
          end={{ fold: detailFold, collapsible: options.detailCollapse.collapsible, id: detailId, label: detailLabel }}
          className="list-detail-layout__edge"
        />
        <Box id={detailId} className={paneClass('detail', { scroll: scroll.detail, empty, folded: detailFold.collapsed })}>
          <PaneRail rail={{ label: detailLabel, side: 'end', onUnfold: detailFold.toggle, items: detailFold.collapsed ? detailRailItems : [] }} className="pane-rail--edge-fold" aria-hidden={!detailFold.collapsed} inert={!detailFold.collapsed} />
          <Box aria-hidden={detailFold.collapsed} inert={detailFold.collapsed} className="list-detail-layout__detail-content">
            {onBack && !empty && <ListDetailLayoutBack label={labels.back} onBack={onBack} />}
            {empty ? (emptyDetail ?? <EmptyState message={lists.pickItem} />) : detail}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { ListDetailLayout };
