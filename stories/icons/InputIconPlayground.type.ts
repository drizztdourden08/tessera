/* @layer stories @kind types */
import type { IconEffectKind, InputIconTone } from '../../src/primitives';

type InkChoice = 'text' | 'primary' | 'secondary' | 'muted';

type EffectChoice = 'none' | IconEffectKind;

type InputIconPlaygroundProps = {
  size: number;
  tone: InputIconTone;
  ink: InkChoice;
  label: string;
  effect: EffectChoice;
};

export type { InputIconPlaygroundProps };
