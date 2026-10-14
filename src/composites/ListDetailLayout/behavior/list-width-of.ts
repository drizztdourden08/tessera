/* @layer renderer-components @kind logic */
import {
  DEFAULT_LIST_WIDTH, DEFAULT_MAX_LIST_WIDTH, DEFAULT_MIN_LIST_WIDTH, MAX_LIST_SHARE, MIN_LIST_SHARE, RATIO_KEY_SUFFIX,
} from '../ListDetailLayout.constants';
import type { ListDetailLayoutProps } from '../ListDetailLayout.type';
import type { PaneSizeOptions } from '../../ResizeHandle/behavior/pane-size.type';

const listWidthOf = (props: ListDetailLayoutProps): PaneSizeOptions => {
  const { listRatio, storageKey } = props;
  if (listRatio !== undefined) {
    return {
      initial: listRatio * 100,
      min: MIN_LIST_SHARE,
      max: MAX_LIST_SHARE,
      storageKey: storageKey === undefined ? undefined : `${storageKey}${RATIO_KEY_SUFFIX}`,
    };
  }
  return {
    initial: props.listWidth ?? DEFAULT_LIST_WIDTH,
    min: props.minListWidth ?? DEFAULT_MIN_LIST_WIDTH,
    max: props.maxListWidth ?? DEFAULT_MAX_LIST_WIDTH,
    storageKey,
  };
};

export { listWidthOf };
