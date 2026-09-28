/* @layer renderer-components @kind types */
import type { ComponentPropsWithRef } from 'react';
import type { KEY_SPECS, KEYBOARD_PLATFORMS } from './Keyboard.constants';
import type { KEY_SYMBOLS } from './sub-components/KeyGlyph.constants';
import type { MOUSE_SPECS } from './sub-components/MouseCap.constants';

type Chars<S extends string> = S extends `${infer Head}${infer Tail}` ? Head | Chars<Tail> : never;

type Letter = Chars<'ABCDEFGHIJKLMNOPQRSTUVWXYZ'>;

type PrintableKey = Letter | Lowercase<Letter> | Chars<'0123456789`~!@#$%^&*()-_=+[]{}\\|;:\'",.<>/?'>;

type FunctionNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

type FunctionKey = `F${FunctionNumber}`;

type KeyName = keyof typeof KEY_SPECS;

type MouseButton = keyof typeof MOUSE_SPECS;

type KeySymbol = keyof typeof KEY_SYMBOLS;

type KeyboardKey = KeyName | MouseButton | PrintableKey | FunctionKey;

type KeyboardPlatform = (typeof KEYBOARD_PLATFORMS)[number];

type ResolvedPlatform = Exclude<KeyboardPlatform, 'auto'>;

type KeyWidth = 'unit' | 'wide' | 'space';

interface KeyLabel {
  word?: string;
  symbol?: KeySymbol;
}

interface KeySpec extends KeyLabel {
  name: string;
  mac?: KeyLabel & { name?: string };
  width?: KeyWidth;
}

interface KeyFace extends KeyLabel {
  name: string;
  width: KeyWidth;
}

interface GlyphSpec {
  viewBox?: string;
  strokes: readonly string[];
  fills?: readonly string[];
}

interface KeyboardProps extends Omit<ComponentPropsWithRef<'kbd'>, 'children'> {
  keys: KeyboardKey | readonly KeyboardKey[];
  platform?: KeyboardPlatform;
}

export type {
  FunctionKey, GlyphSpec, KeyboardKey, KeyboardPlatform, KeyboardProps, KeyFace, KeyName, KeySpec,
  MouseButton, PrintableKey, ResolvedPlatform,
};
