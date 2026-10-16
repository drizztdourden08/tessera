/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PaneFoldButton } from '../../pane-fold/PaneFoldButton';
import { PaneRail } from '../../pane-fold/PaneRail';
import { ResizeHandle } from '../../ResizeHandle/ResizeHandle';
import type { ListDetailLayoutGutterProps } from './ListDetailLayoutGutter.type';

const ListDetailLayoutGutter = (props: ListDetailLayoutGutterProps) => {
  const { list, detail, resizable, handle } = props;
  const { navigation } = useTesseraStrings();
  const folded = [list, detail].find((pane) => pane.fold.collapsed);
  return (
    <PaneRail
      className="list-detail-layout__gutter"
      rail={folded && { label: folded.label, onUnfold: folded.fold.toggle }}
      surface={list.fold.collapsed ? 'sunken' : undefined}
    >
      {list.collapsible && !detail.fold.collapsed && (
        <PaneFoldButton fold={list.fold} label={list.label} controls={list.id} icon="panel-left" className="list-detail-layout__toggle" />
      )}
      {detail.collapsible && !list.fold.collapsed && (
        <PaneFoldButton fold={detail.fold} label={detail.label} controls={detail.id} icon="panel-right" className="list-detail-layout__toggle" />
      )}
      {resizable && !folded && (
        <ResizeHandle
          {...handle}
          label={navigation.resizePanes(list.label, detail.label)}
          title={navigation.resizeHint}
          controls={list.id}
          onCollapse={list.fold.collapse ?? detail.fold.collapse}
        />
      )}
    </PaneRail>
  );
};

export { ListDetailLayoutGutter };
