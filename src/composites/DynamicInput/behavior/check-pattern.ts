/* @layer renderer-components @kind logic */
import { isIconName } from './is-icon-name';
import { PATTERN_PROBLEMS } from './pattern-problems.constants';
import type { ParsedPattern, PatternPart, PatternSlotSpec } from './parse-pattern.type';
import type { PatternSetup } from '../DynamicInput.type';

const listProblems = (slots: readonly PatternSlotSpec[], setup: PatternSetup): string[] =>
  slots
    .filter((slot) => slot.list !== undefined && setup.lists?.[slot.list] === undefined)
    .map((slot) => PATTERN_PROBLEMS.missingList(slot.name, slot.list ?? ''));

const adornmentProblem = (part: PatternPart, setup: PatternSetup): string | null => {
  if (part.kind === 'action' && setup.actions?.[part.name] === undefined) return PATTERN_PROBLEMS.missingAction(part.name);
  if (part.kind === 'icon' && !isIconName(part.name) && setup.icons?.[part.name] === undefined) {
    return PATTERN_PROBLEMS.missingIcon(part.name);
  }
  return null;
};

const counterProblems = (slots: readonly PatternSlotSpec[], counter: string | undefined): string[] => {
  if (counter === undefined) return [];
  const slot = slots.find((known) => known.name === counter);
  const counted = slot?.type === 'text' && (slot.maxLength ?? slot.length) !== undefined;
  return counted ? [] : [PATTERN_PROBLEMS.badCounter(counter)];
};

const checkPattern = (parsed: ParsedPattern, setup: PatternSetup): string[] => [
  ...listProblems(parsed.slots, setup),
  ...parsed.parts.map((part) => adornmentProblem(part, setup)).filter((problem) => problem !== null),
  ...counterProblems(parsed.slots, setup.counter),
];

export { checkPattern };
