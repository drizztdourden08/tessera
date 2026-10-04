/* @layer renderer-components @kind logic */
import { paneOf } from '../../DockLayout';
import type { DockEdge, WidgetId } from '../../DockLayout';
import { dockOnEdge } from './dock-on-edge';
import { dropFrame } from './drop-frame';
import { edgeOf } from './edge-of';
import { floatInMain } from './float-in-main';
import { frameOf } from './frame-of';
import { mainOrWindow } from './main-or-window';
import { placementOf } from './placement-of';
import { removeEverywhere } from './remove-everywhere';
import { setFrame } from './set-frame';
import { setMakeRoom } from './set-make-room';
import type { OptionsPlace } from './options-input-for.type';
import type { WidgetDockApi } from './widget-dock.type';
import type { WidgetOptionsMenuInput } from './widget-options-menu.type';

const optionsInputFor = (api: WidgetDockApi, id: WidgetId, place: OptionsPlace): WidgetOptionsMenuInput => {
  const { rect, main, ...host } = place;
  const def = api.definitionOf(id);
  const placement = placementOf(api.layout, id) ?? 'docked';
  const frame = frameOf(api.layout, id, def);
  return {
    ...host,
    placement,
    dockEdge: placement === 'docked' ? edgeOf(rect, main) : undefined,
    makeRoom: paneOf(api.layout.dock, id)?.makeRoom ?? true,
    opacity: frame.opacity,
    show: frame.show,
    onDock: (edge: DockEdge) => api.change((l) => dockOnEdge(l, id, edge)),
    onFloat: () => api.change((l) => floatInMain(l, id, mainOrWindow(main), def)),
    onPopOut: () => api.popOut(id),
    canPopOut: api.canPopOut(id),
    onMakeRoomChange: (value) => api.change((l) => setMakeRoom(l, id, value)),
    onOpacityChange: (value) => api.change((l) => setFrame(l, id, { opacity: value }, def)),
    onShowChange: (value) => api.change((l) => setFrame(l, id, { show: value }, def)),
    onReset: () => api.change((l) => dropFrame(removeEverywhere(l, id), id)),
  };
};

export { optionsInputFor };
