/* @layer renderer-components @kind data */
import { optionHint } from './option-hint';
import { sliderText } from './slider-text';
import type { PartHintRules, ValueHintRules } from './hint-rules.type';
import type { SettingsOption } from '../SettingsRow.type';

const NONE = (): undefined => undefined;
const NEVER = (): boolean => false;
const anyHint = (input: { options: readonly SettingsOption[] }): boolean => input.options.some((option) => option.hint !== undefined);
const chosen = (input: { options: readonly SettingsOption[]; value: string }) => optionHint(input.options.find((option) => option.value === input.value));

const PART_HINTS: PartHintRules = {
  toggle: (input) => input.hints !== undefined,
  select: anyHint,
  segmented: anyHint,
  radio: NEVER,
  multi: anyHint,
  slider: (input) => input.hintOf !== undefined,
  number: NEVER,
  text: NEVER,
  password: NEVER,
  dynamic: NEVER,
  color: NEVER,
  keybind: NEVER,
  tags: NEVER,
  custom: NEVER,
};

const VALUE_HINTS: ValueHintRules = {
  toggle: (input, words) => {
    const description = input.value ? input.hints?.on : input.hints?.off;
    return description === undefined ? undefined : { label: input.value ? words.on : words.off, description };
  },
  select: chosen,
  segmented: chosen,
  radio: NONE,
  multi: NONE,
  slider: (input) => {
    const description = input.hintOf?.(input.value);
    return description === undefined ? undefined : { label: sliderText(input), description };
  },
  number: NONE,
  text: NONE,
  password: NONE,
  dynamic: NONE,
  color: NONE,
  keybind: NONE,
  tags: NONE,
  custom: NONE,
};

export { PART_HINTS, VALUE_HINTS };
