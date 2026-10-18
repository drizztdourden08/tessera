/* @layer renderer-components @kind logic */
import { DETAIL_COLLAPSED_KEY_SUFFIX } from '../ListDetailLayout.constants';
import { COLLAPSED_KEY_SUFFIX } from '../../pane-edge/pane-edge.constants';
import type { ListDetailLayoutProps } from '../ListDetailLayout.type';
import type { PaneFoldOptions } from '../../pane-edge/pane-fold.type';
import type { LayoutOptions, ListDetailView } from './layout-options.type';
import { listWidthOf } from './list-width-of';

const viewOf = (onBack: (() => void) | undefined, empty: boolean): ListDetailView => {
  if (onBack === undefined) return 'both';
  return empty ? 'list' : 'detail';
};

const keyOf = (storageKey: string | undefined, suffix: string): string | undefined => (storageKey === undefined ? undefined : `${storageKey}${suffix}`);

const listFoldOf = (props: ListDetailLayoutProps): PaneFoldOptions => ({
  collapsible: props.collapsible !== false,
  collapsed: props.collapsed,
  defaultCollapsed: props.defaultCollapsed === true,
  onCollapsedChange: props.onCollapsedChange,
  storageKey: keyOf(props.storageKey, COLLAPSED_KEY_SUFFIX),
});

const detailFoldOf = (props: ListDetailLayoutProps): PaneFoldOptions => ({
  collapsible: props.detailCollapsible === true,
  collapsed: props.detailCollapsed,
  defaultCollapsed: props.defaultDetailCollapsed === true,
  onCollapsedChange: props.onDetailCollapsedChange,
  storageKey: keyOf(props.storageKey, DETAIL_COLLAPSED_KEY_SUFFIX),
});

const layoutOptionsOf = (props: ListDetailLayoutProps): LayoutOptions => {
  const { detail } = props;
  const empty = detail === undefined || detail === null || detail === false;
  return {
    width: listWidthOf(props),
    ratio: props.listRatio !== undefined,
    collapse: listFoldOf(props),
    detailCollapse: detailFoldOf(props),
    scroll: { list: props.listScroll !== false, detail: props.detailScroll !== false },
    view: viewOf(props.onBack, empty),
    empty,
  };
};

export { layoutOptionsOf };
