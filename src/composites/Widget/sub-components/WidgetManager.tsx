/* @layer renderer-components @kind component */
import { useCallback, useMemo, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { DockLayout, useDockKeys } from '../../DockLayout';
import type { FloatingWidget, LayoutEdit, PaneNode, Rect, WidgetId } from '../../DockLayout';
import { FALLBACK_FLOAT_SIZE } from '../Widget.constants';
import type { WidgetDefinition } from '../Widget.type';
import { applyEdit } from '../behavior/apply-edit';
import { mainOrWindow } from '../behavior/main-or-window';
import { removeEverywhere } from '../behavior/remove-everywhere';
import { useDockApi } from '../behavior/useDockApi';
import { visibleLayoutOf } from '../behavior/visible-layout-of';
import { windowRowsFor } from '../behavior/window-rows-for';
import { NO_FORCED_IDS } from './WidgetManager.constants';
import { WidgetOptionsHost } from './WidgetOptionsHost';
import { WidgetPane } from './WidgetPane';
import type { WidgetManagerProps } from './WidgetManager.type';

const WidgetManager = <D extends WidgetDefinition = WidgetDefinition>(props: WidgetManagerProps<D>) => {
  const { definitions, layout, children, contextActive, pageOpen = false, developerToolsEnabled = false } = props;
  const { startupForcedWidgetIds = NO_FORCED_IDS, onMainRect, onExternalDrop, settingsContent, className } = props;
  const keys = useDockKeys();
  const mainRef = useRef<Rect | null>(null);
  const api = useDockApi({ props, peek: props.peek ?? keys.peek, mainRef });

  const visible = useMemo(() => visibleLayoutOf(layout, {
    definitions, contextActive, pageOpen, developerToolsEnabled, forcedIds: startupForcedWidgetIds, contentIds: Object.keys(children),
  }), [layout, definitions, contextActive, pageOpen, developerToolsEnabled, startupForcedWidgetIds, children]);

  const handleMainRect = useCallback((rect: Rect | null) => {
    mainRef.current = rect;
    onMainRect?.(rect);
  }, [onMainRect]);
  const dropIn = useCallback((id: WidgetId, edit: LayoutEdit | null) => {
    onExternalDrop?.(id, edit);
    if (edit) api.change((prev) => applyEdit(removeEverywhere(prev, id), edit, mainOrWindow(mainRef.current)));
  }, [onExternalDrop, api]);
  const optionsOf = (id: WidgetId, rect: Rect) => (
    <WidgetOptionsHost
      api={api}
      id={id}
      paneRect={rect}
      mainRect={mainRef.current}
      settings={settingsContent?.[id]}
      makeRoomHint={props.makeRoomHint}
      contextLabel={props.contextLabel}
      windowRows={windowRowsFor(props, id)}
    />
  );
  const renderPane = (pane: PaneNode, rect: Rect) => (
    <WidgetPane api={api} widgets={pane.widgets} activeId={pane.active} paneKey={pane.key} options={optionsOf(pane.active, rect)} />
  );
  const renderFloating = (f: FloatingWidget, rect: Rect) => (
    <WidgetPane api={api} widgets={[f.id]} activeId={f.id} paneKey={null} options={optionsOf(f.id, rect)} />
  );
  const sizeOf = useCallback((id: WidgetId) => api.definitionOf(id)?.defaultFloatingSize ?? FALLBACK_FLOAT_SIZE, [api]);

  return (
    <Box className={`widget-manager${className ? ` ${className}` : ''}`}>
      <DockLayout
        layout={visible}
        main={props.main}
        peek={api.peek}
        modifiers={props.modifiers ?? keys.modifiers}
        renderPane={renderPane}
        renderFloating={renderFloating}
        onMainRect={handleMainRect}
        onEdit={api.apply}
        onPopOut={api.popOut}
        canPopOut={api.canPopOut}
        labelOf={api.labelOf}
        externalDrag={props.externalDrag}
        onExternalDrop={dropIn}
        sizeOf={sizeOf}
        mainLabel={props.mainLabel} gripLabel={props.gripLabel} mainGrip={props.mainGrip} floatingMin={props.floatingMin}
      />
    </Box>
  );
};

export { WidgetManager };
