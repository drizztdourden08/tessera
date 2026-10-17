/* @layer renderer-components @kind logic */
import { COLLAPSED_KEY_SUFFIX } from '../../pane-fold/pane-fold.constants';
import type { PaneSizeOptions } from '../../ResizeHandle/behavior/pane-size.type';
import { DEFAULT_MAX_PANEL_WIDTH, DEFAULT_MIN_PANEL_WIDTH, DEFAULT_PANEL_WIDTH } from '../SidePanel.constants';
import type { SidePanelProps } from '../SidePanel.type';
import type { SidePanelOptions } from './side-panel-options.type';

const widthOf = (props: SidePanelProps, resizable: boolean): PaneSizeOptions => {
  const initial = props.width ?? DEFAULT_PANEL_WIDTH;
  if (!resizable) return { initial, min: initial, max: initial, storageKey: undefined };
  return {
    initial,
    min: props.minWidth ?? DEFAULT_MIN_PANEL_WIDTH,
    max: props.maxWidth ?? DEFAULT_MAX_PANEL_WIDTH,
    storageKey: props.storageKey,
  };
};

const sidePanelOptionsOf = (props: SidePanelProps): SidePanelOptions => {
  const { storageKey } = props;
  const resizable = props.resizable !== false;
  return {
    fold: {
      collapsible: props.collapsible !== false,
      collapsed: props.collapsed,
      defaultCollapsed: props.defaultCollapsed === true,
      onCollapsedChange: props.onCollapsedChange,
      storageKey: storageKey === undefined ? undefined : `${storageKey}${COLLAPSED_KEY_SUFFIX}`,
    },
    width: widthOf(props, resizable),
    resizable,
  };
};

export { sidePanelOptionsOf };
