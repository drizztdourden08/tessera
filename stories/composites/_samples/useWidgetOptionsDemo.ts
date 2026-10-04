/* @layer stories @kind hook */
import { useState } from 'react';
import type { DockEdge, PinMode, WidgetOptionsProps, WidgetPlacement, WidgetVisibility } from '../../../src/composites';

type DemoPanelProps = Omit<WidgetOptionsProps, 'title' | 'defaultOpen' | 'children'>;

type WidgetOptionsDemo = { panel: DemoPanelProps; summary: string };

const DEFAULT_OPACITY = 0.92;

const placeText = (placement: WidgetPlacement, edge: DockEdge): string =>
  (placement === 'docked' ? `docked on the ${edge}` : placement);

const useWidgetOptionsDemo = (start: WidgetPlacement, startOpacity = DEFAULT_OPACITY): WidgetOptionsDemo => {
  const [placement, setPlacement] = useState<WidgetPlacement>(start);
  const [edge, setEdge] = useState<DockEdge>('right');
  const [makeRoom, setMakeRoom] = useState(true);
  const [opacity, setOpacity] = useState(startOpacity);
  const [show, setShow] = useState<WidgetVisibility>('context-only');
  const [pin, setPin] = useState<PinMode>('off');
  const [snap, setSnap] = useState(true);
  const [sync, setSync] = useState(true);
  const [resets, setResets] = useState(0);

  const panel: DemoPanelProps = {
    placement, dockEdge: edge, makeRoom, opacity, show, pin, snap, sync, canPopOut: true,
    onDock: (next) => { setPlacement('docked'); setEdge(next); },
    onFloat: () => setPlacement('floating'),
    onPopOut: () => setPlacement(placement === 'popped' ? 'docked' : 'popped'),
    onPinChange: setPin,
    onSnapChange: setSnap,
    onSyncChange: setSync,
    onMakeRoomChange: setMakeRoom,
    onOpacityChange: setOpacity,
    onShowChange: setShow,
    onReset: () => { setOpacity(DEFAULT_OPACITY); setMakeRoom(true); setShow('context-only'); setResets((n) => n + 1); },
  };
  const room = makeRoom ? 'makes room' : 'overlay';
  const summary = [
    placeText(placement, edge), room, `opacity ${Math.round(opacity * 100)}%`, `show ${show}`, `pin ${pin}`,
    snap ? 'snaps' : 'free', sync ? 'synced' : 'independent', `resets ${resets}`,
  ].join(' · ');
  return { panel, summary };
};

export { useWidgetOptionsDemo };
export type { DemoPanelProps };
