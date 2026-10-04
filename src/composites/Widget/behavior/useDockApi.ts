/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef } from 'react';
import type { WidgetId } from '../../DockLayout';
import type { WidgetDefinition } from '../Widget.type';
import { applyEdit } from './apply-edit';
import { getWidgetDefinition } from './get-widget-definition';
import { mainOrWindow } from './main-or-window';
import { popOutWidget } from './pop-out-widget';
import { removeEverywhere } from './remove-everywhere';
import type { LayoutUpdater } from './useWidgetLayout.type';
import type { DockApiParams, WidgetDockApi } from './widget-dock.type';

const useDockApi = <D extends WidgetDefinition>(params: DockApiParams<D>): WidgetDockApi => {
  const { props, peek, mainRef } = params;
  const { definitions, layout, onLayoutChange, children, resolveDisabled, onOpenSettings, onPopOut, widgetActions } = props;
  const latest = useRef(layout);
  latest.current = layout;
  const change = useCallback((fn: LayoutUpdater) => onLayoutChange(fn(latest.current)), [onLayoutChange]);

  return useMemo<WidgetDockApi>(() => {
    const definitionOf = (id: WidgetId) => getWidgetDefinition(definitions, id);
    const canPopOut = (id: WidgetId) => onPopOut !== undefined && definitionOf(id)?.popOut === true;
    return {
      layout, peek, definitionOf, canPopOut, change, onOpenSettings,
      labelOf: (id) => definitionOf(id)?.label ?? id,
      contentOf: (id) => children[id],
      actionsOf: (id) => widgetActions?.(id),
      disabledOf: (id) => {
        const def = getWidgetDefinition(definitions, id);
        return def && resolveDisabled ? resolveDisabled(def) : null;
      },
      apply: (edit) => change((prev) => applyEdit(prev, edit, mainOrWindow(mainRef.current))),
      close: (id) => change((prev) => removeEverywhere(prev, id)),
      popOut: (id, point) => {
        if (!canPopOut(id)) return;
        change((prev) => popOutWidget(prev, id));
        onPopOut?.(id, point);
      },
    };
  }, [definitions, layout, peek, change, children, resolveDisabled, onOpenSettings, onPopOut, widgetActions, mainRef]);
};

export { useDockApi };
