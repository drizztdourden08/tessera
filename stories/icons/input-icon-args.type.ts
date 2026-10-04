/* @layer stories @kind types */
import type { IconEffectKind, InputIconFamily, InputIconTone } from '../../src/primitives';

type InkChoice = 'text' | 'primary' | 'secondary' | 'muted';

type EffectChoice = 'none' | IconEffectKind;

type InputIconArgs = {
  family: InputIconFamily;
  name: string;
  size: number;
  tone: InputIconTone;
  ink: InkChoice;
  label: string;
  effect: EffectChoice;
};

export type { InputIconArgs };
