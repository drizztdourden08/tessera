/* @layer renderer-components @kind types */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { SettingsInputKind, SettingsInputOf } from '../SettingsRow.type';

interface OnOffWords {
  on: string;
  off: string;
}

type PartHintRules = { readonly [K in SettingsInputKind]: (input: SettingsInputOf<K>) => boolean };

type ValueHintRules = { readonly [K in SettingsInputKind]: (input: SettingsInputOf<K>, words: OnOffWords) => Hint | undefined };

export type { OnOffWords, PartHintRules, ValueHintRules };
