/* @layer renderer-components @kind hook */
import { useId, useMemo, useRef, type ForwardedRef } from 'react';
import { mergeRefs } from '../../dom/merge-refs';
import { useControlSize } from '../../field-control/useControlSize';
import { NO_RULES } from '../PasswordInput.constants';
import type { PasswordInputProps } from '../PasswordInput.type';
import { defaultStrength } from './default-strength';
import type { PasswordField } from './field.type';
import { useCapsLock } from './useCapsLock';
import { useMaskCells } from './useMaskCells';
import { usePasswordChecks } from './usePasswordChecks';
import { usePasswordReveal } from './usePasswordReveal';

const usePasswordField = (props: PasswordInputProps, ref: ForwardedRef<HTMLInputElement>): PasswordField => {
  const { value, mode = 'current', revealed, defaultRevealed = false, onRevealedChange, maskChar, strength, size } = props;
  const rules = props.rules ?? NO_RULES;
  const controlSize = useControlSize(size);
  const inputRef = useRef<HTMLInputElement>(null);
  const setRef = useMemo(() => mergeRefs(ref, inputRef), [ref]);
  const rulesId = `${useId()}-rules`;
  const reveal = usePasswordReveal({ revealed, defaultRevealed, onRevealedChange, inputRef });
  const caps = useCapsLock();
  const report = usePasswordChecks({ value, rules, strength: strength ?? defaultStrength(mode, rules.length) });
  const masked = maskChar !== undefined && !reveal.shown;
  const cells = useMaskCells(inputRef, masked ? maskChar : undefined, controlSize);
  const describedBy = [props['aria-describedby'], rules.length > 0 ? rulesId : undefined].filter(Boolean).join(' ') || undefined;
  return { inputRef, setRef, size: controlSize, rules, rulesId, describedBy, reveal, caps, report, masked, cells };
};

export { usePasswordField };
