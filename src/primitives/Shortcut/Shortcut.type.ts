/* @layer renderer-components @kind types */
import type { ComponentPropsWithRef } from 'react';
import type { CAP_WIDTHS, CHARACTER_KEYS, KEY_SPECS, LETTER_KEYS, SHORTCUT_LEGENDS } from './Shortcut.constants';
import type { KEY_SYMBOLS } from './sub-components/Keycap.constants';
import type { MOUSE_SPECS } from './sub-components/MouseCap.constants';

type Chars<S extends string> = S extends `${infer Head}${infer Tail}` ? Head | Chars<Tail> : never;

type Letter = Chars<typeof LETTER_KEYS>;

type PrintableKey = Letter | Lowercase<Letter> | Chars<typeof CHARACTER_KEYS>;

type FunctionNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

type FunctionKey = `F${FunctionNumber}`;

type KeyName = keyof typeof KEY_SPECS;

type ShortcutKey = KeyName | PrintableKey | FunctionKey;

type MouseButton = keyof typeof MOUSE_SPECS;

type ShortcutLegend = (typeof SHORTCUT_LEGENDS)[number];

type CapWidth = (typeof CAP_WIDTHS)[number];

type KeySymbolName = keyof typeof KEY_SYMBOLS;

type KeyWidth = CapWidth | 'space';

interface KeySpec {
  name: string;
  label?: string;
  symbol?: KeySymbolName;
  arrow?: KeySymbolName;
  width?: KeyWidth;
}

interface KeyFace {
  name: string;
  label?: string;
  symbol?: KeySymbolName;
  width: KeyWidth;
}

interface ShortcutBaseProps extends Omit<ComponentPropsWithRef<'kbd'>, 'children'> {
  legend?: ShortcutLegend;
  width?: CapWidth;
  animate?: boolean;
}

type ShortcutKeys = ShortcutKey | readonly ShortcutKey[];

type ShortcutInput = { keys: ShortcutKeys; mouse?: MouseButton } | { keys?: ShortcutKeys; mouse: MouseButton };

type ShortcutProps = ShortcutBaseProps & ShortcutInput;

export type {
  CapWidth, FunctionKey, KeyFace, KeyName, KeySpec, MouseButton, PrintableKey, ShortcutKey, ShortcutKeys,
  ShortcutLegend, ShortcutProps,
};
