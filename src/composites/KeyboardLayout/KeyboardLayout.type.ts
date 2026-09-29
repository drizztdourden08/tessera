/* @layer renderer-components @kind types */
import type { HTMLAttributes } from 'react';
import type { ShortcutKey } from '../../primitives';
import type { KEYBOARD_SIZES } from './KeyboardLayout.constants';

type KeyboardSize = (typeof KEYBOARD_SIZES)[number];

type KeyZone = 'function' | 'main' | 'navigation' | 'arrows' | 'numpad';

type SideKey = `${'ctrl' | 'shift' | 'alt' | 'win'}-${'left' | 'right'}`;

type NumpadName = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'enter' | 'plus' | 'minus' | 'times' | 'divide' | 'dot';

type NumpadKey = `numpad-${NumpadName}`;

type KeyboardTarget = ShortcutKey | SideKey | NumpadKey;

interface SlotShape {
  also?: readonly KeyboardTarget[];
  w?: number;
  h?: number;
  gap?: number;
}

type KeySlot = SlotShape & (
  | { id: ShortcutKey; as?: undefined; shows?: undefined }
  | { id: SideKey; as: ShortcutKey; shows?: undefined }
  | { id: NumpadKey; shows: ShortcutKey; as?: undefined }
);

interface KeyRow {
  zone: KeyZone;
  x: number;
  y: number;
  slots: readonly KeySlot[];
}

interface PlacedKey {
  id: KeyboardTarget;
  key: ShortcutKey;
  names: readonly string[];
  zone: KeyZone;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface KeyboardGeometry {
  keys: readonly PlacedKey[];
  columns: number;
  rows: number;
}

interface KeyRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

type KeyRects = ReadonlyMap<string, KeyRect>;

interface KeyboardLayoutProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  highlight?: readonly KeyboardTarget[];
  pressed?: readonly KeyboardTarget[];
  size?: KeyboardSize;
  onKeyRects?: (rects: KeyRects) => void;
}

export type {
  KeyboardGeometry, KeyboardLayoutProps, KeyboardSize, KeyboardTarget, KeyRect, KeyRects, KeyRow, KeySlot, KeyZone,
  PlacedKey,
};
