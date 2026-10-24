/* @layer renderer-components @kind util */
import { withCase } from './with-case';
import type { ParsedPattern, PatternPart, PatternSlotSpec } from './parse-pattern.type';
import type { PatternAliases, PatternSetup } from '../DynamicInput.type';

const caseKeys = (aliases: PatternAliases, slot: PatternSlotSpec): PatternAliases =>
  Object.fromEntries(Object.entries(aliases).map(([typed, stored]) => [withCase(typed, slot), stored]));

const allowedOf = (chars: string | ReadonlySet<string> | undefined, slot: PatternSlotSpec): ReadonlySet<string> | undefined =>
  chars === undefined ? undefined : new Set([...chars].map((char) => withCase(char, slot)));

const ruledSlot = (slot: PatternSlotSpec, setup: PatternSetup): PatternSlotSpec => {
  const config = setup.slots?.[slot.name];
  const aliases = { ...setup.aliases, ...config?.aliases };
  const hasAliases = Object.keys(aliases).length > 0;
  if (slot.type !== 'text' || (!hasAliases && config?.chars === undefined)) return slot;
  return { ...slot, allowed: allowedOf(config?.chars, slot), aliases: hasAliases ? caseKeys(aliases, slot) : undefined };
};

const ruledPart = (part: PatternPart, ruled: ReadonlyMap<PatternSlotSpec, PatternSlotSpec>): PatternPart =>
  part.kind === 'slot' ? { ...part, slot: ruled.get(part.slot) ?? part.slot } : part;

const applyRules = (parsed: ParsedPattern, setup: PatternSetup): ParsedPattern => {
  const ruled = new Map(parsed.slots.map((slot) => [slot, ruledSlot(slot, setup)] as const));
  return { ...parsed, slots: [...ruled.values()], parts: parsed.parts.map((part) => ruledPart(part, ruled)) };
};

export { applyRules };
