/* @layer renderer-components @kind types */
import type { IconName } from '../../../primitives/Icon/Icon.type';
import type { ShortcutKey } from '../../../primitives/Shortcut/Shortcut.type';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { DockEdge } from '../../DockLayout';
import type { MenuGroup } from '../../DropdownMenu';
import type { PinMode, WidgetPlacement, WidgetVisibility } from '../Widget.type';

type WidgetStrings = TesseraStrings['widgets'];

type WidgetWordKey = { [K in keyof WidgetStrings]: WidgetStrings[K] extends string ? K : never }[keyof WidgetStrings];

type WidgetWords = Pick<WidgetStrings, WidgetWordKey>;

type MenuWords = Pick<TesseraStrings, 'widgets' | 'common'>;

type PlacementChoice = DockEdge | 'float' | 'window';

type RoomChoice = 'room' | 'overlay';

interface IconChoice<T extends string> {
  value: T;
  icon: IconName;
  label: WidgetWordKey;
  hint: WidgetWordKey;
}

interface ShortcutEntry {
  keys?: ShortcutKey;
  gesture?: WidgetWordKey;
  does: WidgetWordKey;
}

interface WidgetOptionsMenuInput {
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
  own?: readonly MenuGroup[];
}

type WidgetWindowRows = Pick<WidgetOptionsMenuInput, 'pin' | 'onPinChange' | 'snap' | 'onSnapChange' | 'sync' | 'onSyncChange'>;

interface ChoiceMenuSpec<T extends string> {
  id: string;
  label: string;
  icon?: IconName;
  value: T | '';
  choices: readonly IconChoice<T>[];
  words: WidgetWords;
  onChange: (value: T) => void;
}

export type {
  ChoiceMenuSpec, IconChoice, MenuWords, PlacementChoice, RoomChoice, ShortcutEntry, WidgetOptionsMenuInput, WidgetWindowRows, WidgetWords,
};
