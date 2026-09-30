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
  const { props, peek, options, setOptions, mainRef } = params;
  const { definitions, layout, onLayoutChange, children, resolveDisabled, onOpenSettings, onPopOut } = props;
  const latest = useRef(layout);
  latest.current = layout;
  const change = useCallback((fn: LayoutUpdater) => onLayoutChange(fn(latest.current)), [onLayoutChange]);
  const optionsId = options?.id ?? null;

  return useMemo<WidgetDockApi>(() => {
    const definitionOf = (id: WidgetId) => getWidgetDefinition(definitions, id);
    const canPopOut = (id: WidgetId) => onPopOut !== undefined && definitionOf(id)?.popOut === true;
    return {
      layout, peek, optionsId, definitionOf, canPopOut, change, onOpenSettings,
      labelOf: (id) => definitionOf(id)?.label ?? id,
      contentOf: (id) => children[id],
      disabledOf: (id) => {
        const def = getWidgetDefinition(definitions, id);
        return def && resolveDisabled ? resolveDisabled(def) : null;
      },
      apply: (edit) => change((prev) => applyEdit(prev, edit, mainOrWindow(mainRef.current))),
      close: (id) => {
        if (optionsId === id) setOptions(null);
        change((prev) => removeEverywhere(prev, id));
      },
      popOut: (id) => {
        if (!canPopOut(id)) return;
        change((prev) => popOutWidget(prev, id));
        onPopOut?.(id);
      },
      toggleOptions: (id, anchor) => setOptions(optionsId === id ? null : { id, anchor }),
    };
  }, [definitions, layout, peek, optionsId, change, children, resolveDisabled, onOpenSettings, onPopOut, setOptions, mainRef]);
};

export { useDockApi };
