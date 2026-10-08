/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResizeHandle } from '../../ResizeHandle/ResizeHandle';
import type { ListDetailLayoutGutterProps } from './ListDetailLayoutGutter.type';

const ListDetailLayoutGutter = (props: ListDetailLayoutGutterProps) => {
  const { collapse, collapsible, resizable, listId, listLabel, detailLabel, handle } = props;
  const { navigation } = useTesseraStrings();
  const { collapsed } = collapse;
  const label = collapsed ? navigation.showPane(listLabel) : navigation.hidePane(listLabel);
  return (
    <Box className="list-detail-layout__gutter">
      {collapsible && (
        <IconButton
          ref={collapse.toggleRef}
          size="sm"
          variant="ghost"
          className="list-detail-layout__toggle"
          label={label}
          title={label}
          aria-expanded={!collapsed}
          aria-controls={listId}
          onClick={collapse.toggle}
        >
          <Icon name="panel-left" />
        </IconButton>
      )}
      {collapsed && <Span className="list-detail-layout__rail-label" aria-hidden="true" onClick={collapse.toggle}>{listLabel}</Span>}
      {resizable && !collapsed && (
        <ResizeHandle
          {...handle}
          label={navigation.resizePanes(listLabel, detailLabel)}
          title={navigation.resizeHint}
          controls={listId}
          onCollapse={collapse.collapse}
        />
      )}
    </Box>
  );
};

export { ListDetailLayoutGutter };
