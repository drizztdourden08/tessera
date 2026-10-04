/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../../../../primitives/Icon/Icon.type';
import type { ShortcutKey } from '../../../../primitives/Shortcut/Shortcut.type';
import type { TesseraStrings } from '../../../../primitives/strings/tessera-strings.type';
import type { DockEdge } from '../../../DockLayout';
import type { PinMode, WidgetPlacement, WidgetVisibility } from '../../Widget.type';

type WidgetStrings = TesseraStrings['widgets'];

type WidgetWordKey = { [K in keyof WidgetStrings]: WidgetStrings[K] extends string ? K : never }[keyof WidgetStrings];

type WidgetWords = Pick<WidgetStrings, WidgetWordKey>;

type PlacementChoice = DockEdge | 'float' | 'window';

type RoomChoice = 'room' | 'overlay';

type SnapChoice = 'free' | 'snap';

interface WidgetOptionsProps {
  title: string;
  placement: WidgetPlacement;
  makeRoom: boolean;
  opacity: number;
  show: WidgetVisibility;
  onDock: (edge: DockEdge) => void;
  onFloat: () => void;
  onMakeRoomChange: (value: boolean) => void;
  onOpacityChange: (value: number) => void;
  onShowChange: (value: WidgetVisibility) => void;
  onReset: () => void;
  dockEdge?: DockEdge;
  onPopOut?: () => void;
  canPopOut?: boolean;
  pin?: PinMode;
  onPinChange?: (mode: PinMode) => void;
  snap?: boolean;
  onSnapChange?: (on: boolean) => void;
  sync?: boolean;
  onSyncChange?: (on: boolean) => void;
  makeRoomHint?: string;
  contextLabel?: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}

interface IconChoice<T extends string> {
  value: T;
  icon: IconName;
  label: WidgetWordKey;
  hint: WidgetWordKey;
}

interface ChoiceRowProps<T extends string> {
  label: string;
  value: T | '';
  choices: readonly IconChoice<T>[];
  words: WidgetWords;
  onChange: (value: T) => void;
  children?: ReactNode;
}

interface OptionsHeaderProps {
  title: string;
  onReset: () => void;
}

type PlacementRowProps = Pick<WidgetOptionsProps, 'placement' | 'dockEdge' | 'onDock' | 'onFloat' | 'onPopOut' | 'canPopOut'>;

type LayoutRowsProps = Pick<
  WidgetOptionsProps,
  'placement' | 'makeRoom' | 'makeRoomHint' | 'onMakeRoomChange' | 'opacity' | 'onOpacityChange' | 'show' | 'onShowChange'
  | 'contextLabel' | WindowRowKey
>;

type WindowRowKey = 'pin' | 'onPinChange' | 'snap' | 'onSnapChange' | 'sync' | 'onSyncChange';

type WindowRowsProps = Pick<WidgetOptionsProps, WindowRowKey>;

type SyncRowProps = Required<Pick<WidgetOptionsProps, 'sync' | 'onSyncChange'>>;

interface ShortcutEntry {
  keys?: ShortcutKey;
  gesture?: WidgetWordKey;
  does: WidgetWordKey;
}

export type {
  ChoiceRowProps, IconChoice, LayoutRowsProps, OptionsHeaderProps, PlacementChoice, PlacementRowProps,
  RoomChoice, ShortcutEntry, SnapChoice, SyncRowProps, WidgetOptionsProps, WidgetWords, WindowRowsProps,
};
