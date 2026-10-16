/* @layer renderer-components @kind logic */
import { COLLAPSED_KEY_SUFFIX } from '../../pane-fold/pane-fold.constants';
import { DEFAULT_MAX_PANEL_WIDTH, DEFAULT_MIN_PANEL_WIDTH, DEFAULT_PANEL_WIDTH } from '../SidePanel.constants';
import type { SidePanelProps } from '../SidePanel.type';
import type { SidePanelOptions } from './side-panel-options.type';

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
    width: {
      initial: props.width ?? DEFAULT_PANEL_WIDTH,
      min: props.minWidth ?? DEFAULT_MIN_PANEL_WIDTH,
      max: props.maxWidth ?? DEFAULT_MAX_PANEL_WIDTH,
      storageKey,
    },
    resizable: props.resizable !== false,
  };
};

export { sidePanelOptionsOf };
