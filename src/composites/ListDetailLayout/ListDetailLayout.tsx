/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { EmptyState } from '../../primitives/EmptyState';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { layoutClass } from './behavior/layout-class';
import { layoutOptionsOf } from './behavior/layout-options-of';
import { paneClass } from './behavior/pane-class';
import { useListDetailPanes } from './behavior/useListDetailPanes';
import { ListDetailLayoutBack } from './sub-components/ListDetailLayoutBack';
import { ListDetailLayoutGutter } from './sub-components/ListDetailLayoutGutter';
import type { ListDetailLayoutProps } from './ListDetailLayout.type';
import './ListDetailLayout.css';

const ListDetailLayout = (props: ListDetailLayoutProps) => {
  const { list, detail, emptyDetail, onBack, className } = props;
  const { navigation, lists } = useTesseraStrings();
  const listId = useId();
  const detailId = useId();
  const options = layoutOptionsOf(props);
  const { view, empty, resizable, scroll } = options;
  const panes = useListDetailPanes(options);
  const { listFold, detailFold } = panes;
  const look = { resizable, collapsed: listFold.collapsed, detailCollapsed: detailFold.collapsed, dragging: panes.dragging };

  return (
    <Box className={layoutClass(look, className)}>
      <Box ref={panes.panesRef} className="list-detail-layout__panes" data-view={view} style={{ gridTemplateColumns: panes.columns }}>
        <Box id={listId} surface="sunken" className={paneClass('list', scroll.list)}>{list}</Box>
        <ListDetailLayoutGutter
          list={{ fold: listFold, collapsible: options.collapse.collapsible, id: listId, label: props.listLabel ?? navigation.listPane }}
          detail={{ fold: detailFold, collapsible: options.detailCollapse.collapsible, id: detailId, label: props.detailLabel ?? navigation.detailPane }}
          resizable={resizable}
          handle={panes.handle}
        />
        <Box id={detailId} className={paneClass('detail', scroll.detail, empty)}>
          {onBack && !empty && <ListDetailLayoutBack label={props.backLabel ?? navigation.back} onBack={onBack} />}
          {empty ? (emptyDetail ?? <EmptyState message={lists.pickItem} />) : detail}
        </Box>
      </Box>
    </Box>
  );
};

export { ListDetailLayout };
