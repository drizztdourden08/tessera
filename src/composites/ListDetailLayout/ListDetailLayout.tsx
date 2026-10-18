/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { EmptyState } from '../../primitives/EmptyState';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PaneEdge } from '../pane-edge/PaneEdge';
import { PaneRail } from '../pane-edge/PaneRail';
import { layoutClass } from './behavior/layout-class';
import { labelsOf } from './behavior/labels-of';
import { layoutOptionsOf } from './behavior/layout-options-of';
import { paneClass } from './behavior/pane-class';
import { useListDetailPanes } from './behavior/useListDetailPanes';
import { ListDetailLayoutBack } from './sub-components/ListDetailLayoutBack';
import type { ListDetailLayoutProps } from './ListDetailLayout.type';
import './ListDetailLayout.css';

const ListDetailLayout = (props: ListDetailLayoutProps) => {
  const { list, detail, emptyDetail, onBack, className } = props;
  const { navigation, lists } = useTesseraStrings();
  const listId = useId();
  const detailId = useId();
  const options = layoutOptionsOf(props);
  const { view, empty, scroll } = options;
  const panes = useListDetailPanes(options);
  const { listFold, detailFold } = panes;
  const labels = labelsOf(props, { list: navigation.listPane, detail: navigation.detailPane, back: navigation.back });
  const { list: listLabel, detail: detailLabel } = labels;
  const look = { collapsed: listFold.collapsed, detailCollapsed: detailFold.collapsed, dragging: panes.dragging };

  return (
    <Box className={layoutClass(look, className)}>
      <Box ref={panes.panesRef} className="list-detail-layout__panes pane-edge-host" data-view={view} style={{ gridTemplateColumns: panes.columns }}>
        <Box
          id={listId}
          surface={listFold.collapsed ? undefined : 'sunken'}
          className={paneClass('list', { scroll: scroll.list, empty: false, folded: listFold.collapsed })}
        >
          {listFold.collapsed && <PaneRail rail={{ label: listLabel, side: 'start', onUnfold: listFold.toggle }} />}
          {list}
        </Box>
        <PaneEdge
          handle={panes.handle}
          start={{ fold: listFold, collapsible: options.collapse.collapsible, id: listId, label: listLabel }}
          end={{ fold: detailFold, collapsible: options.detailCollapse.collapsible, id: detailId, label: detailLabel }}
        />
        <Box id={detailId} className={paneClass('detail', { scroll: scroll.detail, empty, folded: detailFold.collapsed })}>
          {detailFold.collapsed && <PaneRail rail={{ label: detailLabel, side: 'end', onUnfold: detailFold.toggle }} />}
          {onBack && !empty && <ListDetailLayoutBack label={labels.back} onBack={onBack} />}
          {empty ? (emptyDetail ?? <EmptyState message={lists.pickItem} />) : detail}
        </Box>
      </Box>
    </Box>
  );
};

export { ListDetailLayout };
