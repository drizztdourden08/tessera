/* @layer renderer-components @kind logic */
import { DEFAULT_LIST_WIDTH, DEFAULT_MAX_LIST_WIDTH, DEFAULT_MIN_LIST_WIDTH } from '../MasterDetailLayout.constants';
import type { MasterDetailLayoutProps } from '../MasterDetailLayout.type';
import type { LayoutOptions, MasterDetailView } from './layout-options.type';

const viewOf = (props: MasterDetailLayoutProps): MasterDetailView => {
  if (props.onBack === undefined) return 'both';
  return props.detailEmpty === true ? 'list' : 'detail';
};

const layoutOptionsOf = (props: MasterDetailLayoutProps): LayoutOptions => ({
  width: {
    initial: props.listWidth ?? DEFAULT_LIST_WIDTH,
    min: props.minListWidth ?? DEFAULT_MIN_LIST_WIDTH,
    max: props.maxListWidth ?? DEFAULT_MAX_LIST_WIDTH,
    storageKey: props.storageKey,
  },
  view: viewOf(props),
  resizable: props.resizable !== false,
});

export { layoutOptionsOf };
