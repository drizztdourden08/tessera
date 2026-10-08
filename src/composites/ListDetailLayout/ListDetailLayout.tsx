/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { EmptyState } from '../../primitives/EmptyState';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { usePaneSize } from '../ResizeHandle/behavior/usePaneSize';
import { layoutClass } from './behavior/layout-class';
import { layoutOptionsOf } from './behavior/layout-options-of';
import { useListCollapse } from './behavior/useListCollapse';
import { ListDetailLayoutBack } from './sub-components/ListDetailLayoutBack';
import { ListDetailLayoutGutter } from './sub-components/ListDetailLayoutGutter';
import type { ListDetailLayoutProps } from './ListDetailLayout.type';
import './ListDetailLayout.css';

const ListDetailLayout = (props: ListDetailLayoutProps) => {
  const { list, detail, emptyDetail, onBack, className } = props;
  const { navigation, lists } = useTesseraStrings();
  const listId = useId();
  const { width: limits, collapse: collapseOptions, view, empty, resizable } = layoutOptionsOf(props);
  const collapse = useListCollapse(collapseOptions);
  const { size: width, dragging, handle } = usePaneSize(limits);
  const { collapsed } = collapse;
  const columns = collapsed ? 'auto minmax(0, 1fr)' : `${width}px auto minmax(0, 1fr)`;

  return (
    <Box className={layoutClass({ resizable, collapsed, dragging }, className)}>
      <Box className="list-detail-layout__panes" data-view={view} style={{ gridTemplateColumns: columns }}>
        <Box id={listId} className="list-detail-layout__list">{list}</Box>
        <ListDetailLayoutGutter
          collapse={collapse}
          collapsible={collapseOptions.collapsible}
          resizable={resizable}
          listId={listId}
          listLabel={props.listLabel ?? navigation.listPane}
          detailLabel={props.detailLabel ?? navigation.detailPane}
          handle={handle}
        />
        <Box className={`list-detail-layout__detail${empty ? ' list-detail-layout__detail--empty' : ''}`}>
          {onBack && !empty && <ListDetailLayoutBack label={props.backLabel ?? navigation.back} onBack={onBack} />}
          {empty ? (emptyDetail ?? <EmptyState message={lists.pickItem} />) : detail}
        </Box>
      </Box>
    </Box>
  );
};

export { ListDetailLayout };
