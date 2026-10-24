/* @layer renderer-components @kind util */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { ParsedPattern, PatternSlotSpec } from './parse-pattern.type';
import type { PatternRuleMessage, PatternSetup, PatternSlotValue, PatternValue } from '../DynamicInput.type';

const textOf = (message: PatternRuleMessage): string | undefined =>
  message === null || message === undefined || message === '' ? undefined : message;

const incompleteOf = (
  slot: PatternSlotSpec,
  value: PatternSlotValue | undefined,
  strings: TesseraStrings['dynamicInput'],
): string | undefined => {
  if (slot.type !== 'text' || typeof value !== 'string' || value === '') return undefined;
  const size = [...value].length;
  if (slot.length !== undefined) return size < slot.length ? strings.incomplete(slot.length) : undefined;
  return slot.minLength !== undefined && size < slot.minLength ? strings.incompleteMin(slot.minLength) : undefined;
};

const ruleMessage = (
  parsed: ParsedPattern,
  value: PatternValue,
  setup: PatternSetup,
  strings: TesseraStrings['dynamicInput'],
): string | undefined => {
  for (const slot of parsed.slots) {
    const checked = textOf(setup.slots?.[slot.name]?.validate?.(value[slot.name] ?? null));
    const message = checked ?? incompleteOf(slot, value[slot.name], strings);
    if (message !== undefined) return message;
  }
  return textOf(setup.validate?.(value));
};

export { ruleMessage };
