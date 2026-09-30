/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { ShortcutKey } from '../../../../primitives/Shortcut/Shortcut.type';
import type { DockEdge } from '../../../DockLayout';
import type { PinMode, WidgetPlacement, WidgetVisibility } from '../../Widget.type';

interface WidgetOptionsProps {
  title: string;
  placement: WidgetPlacement;
  makeRoom: boolean;
  opacity: number;
  show: WidgetVisibility;
  anchorRef: RefObject<HTMLElement | null>;
  onDock: (edge: DockEdge) => void;
  onFloat: () => void;
  onMakeRoomChange: (value: boolean) => void;
  onOpacityChange: (value: number) => void;
  onShowChange: (value: WidgetVisibility) => void;
  onReset: () => void;
  onClose: () => void;
  dockEdge?: DockEdge;
  onPopOut?: () => void;
  canPopOut?: boolean;
  pin?: PinMode;
  onPinChange?: (mode: PinMode) => void;
  snap?: boolean;
  onSnapChange?: (on: boolean) => void;
  makeRoomHint?: string;
  contextLabel?: string;
  children?: ReactNode;
}

interface OptionRowProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

type PlacementRowProps = Pick<WidgetOptionsProps, 'placement' | 'dockEdge' | 'onDock' | 'onFloat' | 'onPopOut' | 'canPopOut'>;

type LayoutRowsProps = Pick<
  WidgetOptionsProps,
  'placement' | 'makeRoom' | 'makeRoomHint' | 'onMakeRoomChange' | 'pin' | 'onPinChange' | 'snap' | 'onSnapChange'
  | 'opacity' | 'onOpacityChange' | 'show' | 'onShowChange' | 'contextLabel'
>;

type WindowRowsProps = Pick<WidgetOptionsProps, 'pin' | 'onPinChange' | 'snap' | 'onSnapChange'>;

interface PlacementButton {
  edge: DockEdge | null;
  label: string;
}

interface ShortcutEntry {
  keys?: ShortcutKey;
  gesture: string;
  does: string;
}

export type { LayoutRowsProps, OptionRowProps, PlacementButton, PlacementRowProps, ShortcutEntry, WidgetOptionsProps, WindowRowsProps };
