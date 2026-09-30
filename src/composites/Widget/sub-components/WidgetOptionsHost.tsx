/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { paneOf } from '../../DockLayout';
import type { DockEdge } from '../../DockLayout';
import type { LayoutUpdater } from '../behavior/useWidgetLayout.type';
import { dockOnEdge } from '../behavior/dock-on-edge';
import { dropFrame } from '../behavior/drop-frame';
import { edgeOf } from '../behavior/edge-of';
import { floatInMain } from '../behavior/float-in-main';
import { frameOf } from '../behavior/frame-of';
import { mainOrWindow } from '../behavior/main-or-window';
import { placementOf } from '../behavior/placement-of';
import { removeEverywhere } from '../behavior/remove-everywhere';
import { setFrame } from '../behavior/set-frame';
import { setMakeRoom } from '../behavior/set-make-room';
import { WidgetOptions } from './WidgetOptions';
import type { WidgetOptionsHostProps } from './WidgetOptionsHost.type';

const WidgetOptionsHost = (props: WidgetOptionsHostProps) => {
  const { api, target, paneRect, mainRect, onClose, settings, makeRoomHint, contextLabel } = props;
  const { id, anchor } = target;
  const anchorRef = useMemo(() => ({ current: anchor }), [anchor]);
  const def = api.definitionOf(id);
  const placement = placementOf(api.layout, id) ?? 'docked';
  const frame = frameOf(api.layout, id, def);
  const move = (fn: LayoutUpdater) => {
    onClose();
    api.change(fn);
  };

  return (
    <WidgetOptions
      title={api.labelOf(id)}
      placement={placement}
      dockEdge={placement === 'docked' ? edgeOf(paneRect, mainRect) : undefined}
      makeRoom={paneOf(api.layout.dock, id)?.makeRoom ?? true}
      opacity={frame.opacity}
      show={frame.show}
      anchorRef={anchorRef}
      onDock={(edge: DockEdge) => move((l) => dockOnEdge(l, id, edge))}
      onFloat={() => move((l) => floatInMain(l, id, mainOrWindow(mainRect), def))}
      onPopOut={() => api.popOut(id)}
      canPopOut={api.canPopOut(id)}
      onMakeRoomChange={(value) => api.change((l) => setMakeRoom(l, id, value))}
      onOpacityChange={(value) => api.change((l) => setFrame(l, id, { opacity: value }, def))}
      onShowChange={(value) => api.change((l) => setFrame(l, id, { show: value }, def))}
      onReset={() => move((l) => dropFrame(removeEverywhere(l, id), id))}
      onClose={onClose}
      makeRoomHint={makeRoomHint}
      contextLabel={contextLabel}
    >
      {settings}
    </WidgetOptions>
  );
};

export { WidgetOptionsHost };
