/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { SettingsInputKind, SettingsInputOf } from '../SettingsRow.type';

interface RenderContext {
  label: string;
  disabled: boolean;
  strings: TesseraStrings['settings'];
}

type InputRenderers = { readonly [K in SettingsInputKind]: (input: SettingsInputOf<K>, context: RenderContext) => ReactNode };

export type { InputRenderers, RenderContext };
