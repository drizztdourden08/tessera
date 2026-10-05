/* @layer renderer-components @kind logic */
import {
  COLLAPSED_KEY_SUFFIX, DEFAULT_LIST_WIDTH, DEFAULT_MAX_LIST_WIDTH, DEFAULT_MIN_LIST_WIDTH,
} from '../ListDetailLayout.constants';
import type { ListDetailLayoutProps } from '../ListDetailLayout.type';
import type { LayoutOptions, ListDetailView } from './layout-options.type';

const viewOf = (onBack: (() => void) | undefined, empty: boolean): ListDetailView => {
  if (onBack === undefined) return 'both';
  return empty ? 'list' : 'detail';
};

const layoutOptionsOf = (props: ListDetailLayoutProps): LayoutOptions => {
  const { detail, storageKey } = props;
  const empty = detail === undefined || detail === null || detail === false;
  return {
    width: {
      initial: props.listWidth ?? DEFAULT_LIST_WIDTH,
      min: props.minListWidth ?? DEFAULT_MIN_LIST_WIDTH,
      max: props.maxListWidth ?? DEFAULT_MAX_LIST_WIDTH,
      storageKey,
    },
    collapse: {
      collapsible: props.collapsible !== false,
      collapsed: props.collapsed,
      defaultCollapsed: props.defaultCollapsed === true,
      onCollapsedChange: props.onCollapsedChange,
      storageKey: storageKey === undefined ? undefined : `${storageKey}${COLLAPSED_KEY_SUFFIX}`,
    },
    view: viewOf(props.onBack, empty),
    empty,
    resizable: props.resizable !== false,
  };
};

export { layoutOptionsOf };
