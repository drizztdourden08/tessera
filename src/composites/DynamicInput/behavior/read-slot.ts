/* @layer renderer-components @kind logic */
import { classifySlotArg } from './classify-slot-arg';
import { finishSlot } from './finish-slot';
import { ARG_FORMS, ARG_KEYS, SLOT_NAME, SLOT_TYPES } from './parse-pattern.constants';
import { PATTERN_PROBLEMS } from './pattern-problems.constants';
import { splitArgs } from './split-args';
import type { PatternSlotSpec, PatternSlotType, SlotRead } from './parse-pattern.type';

const isSlotType = (type: string): type is PatternSlotType => (SLOT_TYPES as readonly string[]).includes(type);

const formsOf = (type: PatternSlotType): string => ARG_KEYS[type].map((key) => ARG_FORMS[key]).join(', ');

const applyArgs = (base: PatternSlotSpec, args: readonly string[]): SlotRead => {
  const problems: string[] = [];
  let spec = base;
  for (const arg of args) {
    const read = classifySlotArg(arg);
    if (read !== null && ARG_KEYS[spec.type].includes(read.key)) spec = { ...spec, ...read.patch };
    else problems.push(PATTERN_PROBLEMS.badArg(spec.name, spec.type, arg, formsOf(spec.type)));
  }
  return finishSlot(spec, problems);
};

const readSlot = (body: string): SlotRead => {
  const colon = body.indexOf(':');
  if (colon <= 0) return { slot: null, problems: [PATTERN_PROBLEMS.badSlot(body)] };
  const name = body.slice(0, colon).trim();
  if (!SLOT_NAME.test(name)) return { slot: null, problems: [PATTERN_PROBLEMS.badName(name)] };
  const [type = '', ...args] = splitArgs(body.slice(colon + 1));
  if (!isSlotType(type)) return { slot: null, problems: [PATTERN_PROBLEMS.unknownType(name, type, SLOT_TYPES.join(', '))] };
  return applyArgs({ name, type }, args);
};

export { readSlot };
