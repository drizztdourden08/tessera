/* @layer renderer-components @kind util */
import { numericArg } from './numeric-arg';
import { CHOICE_SEPARATOR, LIST_ARG, WORD_ARGS } from './parse-pattern.constants';
import { QUOTE } from './scan-pattern.constants';
import type { SlotArg } from './slot-arg.type';

const isQuoted = (arg: string): boolean => arg.length >= 2 && arg.startsWith(QUOTE) && arg.endsWith(QUOTE);

const classifySlotArg = (arg: string): SlotArg | null => {
  if (isQuoted(arg)) return { key: 'label', patch: { label: arg.slice(1, -1) } };
  const list = LIST_ARG.exec(arg);
  if (list !== null) return { key: 'list', patch: { list: list[1] ?? '' } };
  if (arg.includes(CHOICE_SEPARATOR)) {
    return { key: 'choices', patch: { choices: arg.split(CHOICE_SEPARATOR).filter((choice) => choice !== '') } };
  }
  return WORD_ARGS.get(arg) ?? numericArg(arg);
};

export { classifySlotArg };
