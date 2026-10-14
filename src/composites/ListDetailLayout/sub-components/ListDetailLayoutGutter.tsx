/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResizeHandle } from '../../ResizeHandle/ResizeHandle';
import { ListDetailLayoutFold } from './ListDetailLayoutFold';
import type { ListDetailLayoutGutterProps } from './ListDetailLayoutGutter.type';

const ListDetailLayoutGutter = (props: ListDetailLayoutGutterProps) => {
  const { list, detail, resizable, handle } = props;
  const { navigation } = useTesseraStrings();
  const folded = [list, detail].find((pane) => pane.fold.collapsed);
  return (
    <Box className="list-detail-layout__gutter">
      {list.collapsible && !detail.fold.collapsed && <ListDetailLayoutFold pane={list} icon="panel-left" />}
      {detail.collapsible && !list.fold.collapsed && <ListDetailLayoutFold pane={detail} icon="panel-right" />}
      {folded && <Span className="list-detail-layout__rail-label" aria-hidden="true" onClick={folded.fold.toggle}>{folded.label}</Span>}
      {resizable && !folded && (
        <ResizeHandle
          {...handle}
          label={navigation.resizePanes(list.label, detail.label)}
          title={navigation.resizeHint}
          controls={list.id}
          onCollapse={list.fold.collapse ?? detail.fold.collapse}
        />
      )}
    </Box>
  );
};

export { ListDetailLayoutGutter };
