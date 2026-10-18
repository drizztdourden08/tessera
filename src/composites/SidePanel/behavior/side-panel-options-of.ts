/* @layer renderer-components @kind logic */
import { COLLAPSED_KEY_SUFFIX } from '../../pane-edge/pane-edge.constants';
import type { PaneSizeOptions } from '../../ResizeHandle/behavior/pane-size.type';
import { DEFAULT_MAX_PANEL_WIDTH, DEFAULT_MIN_PANEL_WIDTH, DEFAULT_PANEL_WIDTH } from '../SidePanel.constants';
import type { SidePanelProps } from '../SidePanel.type';
import type { SidePanelOptions } from './side-panel-options.type';

const widthOf = (props: SidePanelProps): PaneSizeOptions => {
  const initial = props.width ?? DEFAULT_PANEL_WIDTH;
  return {
    initial,
    min: props.minWidth ?? Math.min(DEFAULT_MIN_PANEL_WIDTH, initial),
    max: props.maxWidth ?? Math.max(DEFAULT_MAX_PANEL_WIDTH, initial),
    storageKey: props.storageKey,
  };
};

const sidePanelOptionsOf = (props: SidePanelProps): SidePanelOptions => {
  const { storageKey } = props;
  return {
    fold: {
      collapsible: props.collapsible !== false,
      collapsed: props.collapsed,
      defaultCollapsed: props.defaultCollapsed === true,
      onCollapsedChange: props.onCollapsedChange,
      storageKey: storageKey === undefined ? undefined : `${storageKey}${COLLAPSED_KEY_SUFFIX}`,
    },
    width: widthOf(props),
  };
};

export { sidePanelOptionsOf };
