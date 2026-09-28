/* @layer renderer-components @kind component */
import { useMemo, useEffect } from 'react';
import { Box } from '../../../primitives/Box';
import { DisabledOverlay } from '../../DisabledOverlay';
import type { WidgetDefinition } from '../Widget.type';
import { Widget } from '../Widget';
import { TITLEBAR_HEIGHT } from '../Widget.constants';
import { computeDockedStyles } from '../behavior/compute-docked-styles';
import { getWidgetDefinition } from '../behavior/get-widget-definition';
import { isWidgetActive } from '../behavior/is-widget-active';
import { NO_FORCED_IDS } from './WidgetManager.constants';
import type { WidgetManagerProps } from './WidgetManager.type';

const WidgetManager = <D extends WidgetDefinition = WidgetDefinition>(props: WidgetManagerProps<D>) => {
  const {
    definitions, layout, contextActive, pageOpen = false, onUpdate, onClose, onInsetsChange, children,
    settingsContent, developerToolsEnabled = false, startupForcedWidgetIds = NO_FORCED_IDS, resolveDisabled,
    onOpenSettings, topOffset: topOffsetProp, bounds = 'viewport', exclusiveLabel,
  } = props;
  const topOffset = topOffsetProp ?? (bounds === 'container' ? 0 : TITLEBAR_HEIGHT);
  const activeWidgets = useMemo(() => {
    const ctx = { definitions, contextActive, pageOpen, developerToolsEnabled, forcedIds: startupForcedWidgetIds };
    return layout.widgets.filter((w) => isWidgetActive(w, ctx));
  },[layout.widgets, definitions, contextActive, pageOpen, developerToolsEnabled, startupForcedWidgetIds]);

  const { styles: dockedStyles, exclusiveInsets } = useMemo(
    () => computeDockedStyles(activeWidgets, topOffset, bounds),
    [activeWidgets, topOffset, bounds],
  );

  const { left, right, top, bottom } = exclusiveInsets;
  useEffect(() => {
    onInsetsChange?.({ left, right, top, bottom });
  }, [left, right, top, bottom, onInsetsChange]);

  return (
    <Box className={`widget-manager${bounds === 'container' ? ' widget-manager--contained' : ''}`}>
      {activeWidgets.map((w) => {
        const content = children[w.id];
        if (!content) return null;

        const def = getWidgetDefinition(definitions, w.id);
        const disabled = def && resolveDisabled ? resolveDisabled(def) : null;

        return (
          <Widget
            key={w.id}
            state={w}
            label={def?.label}
            onChange={(patch) => onUpdate(w.id, patch)}
            onClose={() => onClose(w.id)}
            dockedStyle={w.mode === 'docked' ? dockedStyles.get(w.id) : undefined}
            settingsContent={settingsContent?.[w.id]}
            exclusiveLabel={exclusiveLabel}
          >
            <DisabledOverlay
              active={disabled != null}
              message={disabled?.message}
              contained
              onOpenSettings={disabled && onOpenSettings ? () => onOpenSettings(disabled.settingId) : undefined}
            >
              {content}
            </DisabledOverlay>
          </Widget>
        );
      })}
    </Box>
  );
};

export { WidgetManager };
