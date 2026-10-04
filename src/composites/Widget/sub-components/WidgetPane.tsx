/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { DisabledOverlay } from '../../DisabledOverlay';
import { Widget } from '../Widget';
import { frameOf } from '../behavior/frame-of';
import type { WidgetPaneProps } from './WidgetPane.type';

const WidgetPane = (props: WidgetPaneProps) => {
  const { api, widgets, activeId, paneKey, options } = props;
  const tabs = useMemo(() => widgets.map((id) => ({ id, label: api.labelOf(id) })), [widgets, api]);
  const disabled = api.disabledOf(activeId);
  const openSettings = api.onOpenSettings;
  const onOpenSettings = disabled && openSettings ? () => openSettings(disabled.settingId) : undefined;

  return (
    <Widget
      id={activeId}
      tabs={tabs}
      activeId={activeId}
      paneKey={paneKey}
      opacity={frameOf(api.layout, activeId, api.definitionOf(activeId)).opacity}
      peek={api.peek}
      options={options}
      onActivateTab={(id) => { if (paneKey) api.apply({ type: 'activate-tab', key: paneKey, id }); }}
      onPopOut={() => api.popOut(activeId)}
      canPopOut={api.canPopOut(activeId)}
      onClose={() => api.close(activeId)}
      titleBarActions={api.actionsOf(activeId)}
    >
      <DisabledOverlay active={disabled !== null} message={disabled?.message} contained onOpenSettings={onOpenSettings}>
        {api.contentOf(activeId)}
      </DisabledOverlay>
    </Widget>
  );
};

export { WidgetPane };
