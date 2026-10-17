/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CollapseToggle } from '../../CollapseToggle';
import type { CollapseToggleSide } from '../../CollapseToggle/CollapseToggle.type';
import { PaneRail } from '../../pane-fold/PaneRail';
import { ResizeHandle } from '../../ResizeHandle/ResizeHandle';
import type { GutterPane, ListDetailLayoutGutterProps } from './ListDetailLayoutGutter.type';

const toggleOf = (pane: GutterPane, side: CollapseToggleSide) => (
  <CollapseToggle
    ref={pane.fold.toggleRef}
    collapsed={pane.fold.collapsed}
    onToggle={pane.fold.toggle}
    label={pane.label}
    side={side}
    controls={pane.id}
    className={`list-detail-layout__toggle list-detail-layout__toggle--${side}`}
  />
);

const ListDetailLayoutGutter = (props: ListDetailLayoutGutterProps) => {
  const { list, detail, resizable, handle } = props;
  const { navigation } = useTesseraStrings();
  const folded = [list, detail].find((pane) => pane.fold.collapsed);
  return (
    <PaneRail className="list-detail-layout__gutter" rail={folded && { label: folded.label, side: folded === list ? 'start' : 'end', onUnfold: folded.fold.toggle }}>
      {list.collapsible && !detail.fold.collapsed && toggleOf(list, 'start')}
      {detail.collapsible && !list.fold.collapsed && toggleOf(detail, 'end')}
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
