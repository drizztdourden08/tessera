/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { Hint } from '../../../../primitives/hint/hint.type';
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
  hint?: Hint;
  children: ReactNode;
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
  shortcutsOpen: boolean;
  onToggleShortcuts: () => void;
  onReset: () => void;
  onClose: () => void;
}

interface ShortcutsAsideProps {
  panelRef: RefObject<HTMLElement | null>;
}

type PlacementRowProps = Pick<WidgetOptionsProps, 'placement' | 'dockEdge' | 'onDock' | 'onFloat' | 'onPopOut' | 'canPopOut'>;

type LayoutRowsProps = Pick<
  WidgetOptionsProps,
  'placement' | 'makeRoom' | 'makeRoomHint' | 'onMakeRoomChange' | 'pin' | 'onPinChange' | 'snap' | 'onSnapChange'
  | 'opacity' | 'onOpacityChange' | 'show' | 'onShowChange' | 'contextLabel'
>;

type WindowRowsProps = Pick<WidgetOptionsProps, 'pin' | 'onPinChange' | 'snap' | 'onSnapChange'>;

interface ShortcutEntry {
  keys?: ShortcutKey;
  gesture?: WidgetWordKey;
  does: WidgetWordKey;
}

export type {
  ChoiceRowProps, IconChoice, LayoutRowsProps, OptionRowProps, OptionsHeaderProps, PlacementChoice, PlacementRowProps,
  RoomChoice, ShortcutEntry, ShortcutsAsideProps, SnapChoice, WidgetOptionsProps, WidgetWords, WindowRowsProps,
};
