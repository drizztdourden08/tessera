/* @layer renderer-components @kind types */
import type { RefCallback, RefObject } from 'react';
import type { ControlSize } from '../../../primitives/field-control/field-control.type';
import type { PasswordRule } from '../PasswordInput.type';
import type { CapsLock } from './caps-lock.type';
import type { PasswordChecks } from './checks.type';
import type { MaskCells } from './mask.type';
import type { Reveal } from './reveal.type';

interface PasswordField {
  inputRef: RefObject<HTMLInputElement | null>;
  setRef: RefCallback<HTMLInputElement>;
  size: ControlSize;
  rules: readonly PasswordRule[];
  rulesId: string;
  describedBy: string | undefined;
  reveal: Reveal;
  caps: CapsLock;
  report: PasswordChecks;
  masked: boolean;
  cells: MaskCells;
}

export type { PasswordField };
