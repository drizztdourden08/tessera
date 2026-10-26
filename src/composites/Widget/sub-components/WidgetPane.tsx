/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Widget } from '../Widget';
import { frameOf } from '../behavior/frame-of';
import type { WidgetPaneProps } from './WidgetPane.type';

const WidgetPane = (props: WidgetPaneProps) => {
  const { api, widgets, activeId, paneKey, options } = props;
  const tabs = useMemo(() => widgets.map((id) => ({ id, label: api.labelOf(id), icon: api.iconOf(id) })), [widgets, api]);
  const disabled = api.disabledOf(activeId);
  const definition = api.definitionOf(activeId);
  const openSettings = api.onOpenSettings;
  const onOpenSettings = disabled && openSettings ? () => openSettings(disabled.settingId) : undefined;

  return (
    <Widget
      id={activeId}
      tabs={tabs}
      activeId={activeId}
      paneKey={paneKey}
      opacity={frameOf(api.layout, activeId, definition).opacity}
      padding={definition?.padding}
      fill={definition?.fill}
      chrome={definition?.chrome}
      peek={api.peek}
      options={options}
      onActivateTab={(id) => { if (paneKey) api.apply({ type: 'activate-tab', key: paneKey, id }); }}
      onPopOut={() => api.popOut(activeId)}
      canPopOut={api.canPopOut(activeId)}
      onClose={() => api.close(activeId)}
      titleBarActions={api.actionsOf(activeId)}
      disabled={disabled === null ? undefined : disabled.message || true}
      onOpenSettings={onOpenSettings}
    >
      {api.contentOf(activeId)}
    </Widget>
  );
};

export { WidgetPane };
