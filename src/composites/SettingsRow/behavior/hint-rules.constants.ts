/* @layer renderer-components @kind data */
import type { Hint } from '../../../primitives/hint/hint.type';
import { optionHint } from './option-hint';
import { sliderHints } from './slider-hints';
import { sliderText } from './slider-text';
import type { LineHintRules, ValueHintRules } from './hint-rules.type';
import type { SettingsOption } from '../SettingsRow.type';

const NONE = (): undefined => undefined;
const EMPTY = (): readonly Hint[] => [];
const everyHint = (input: { options: readonly SettingsOption[] }): readonly Hint[] =>
  input.options.flatMap((option) => optionHint(option) ?? []);
const chosen = (input: { options: readonly SettingsOption[]; value: string }) => optionHint(input.options.find((option) => option.value === input.value));

const LINE_HINTS: LineHintRules = {
  toggle: (input, words) => [
    ...(input.hints?.on === undefined ? [] : [{ label: words.on, description: input.hints.on }]),
    ...(input.hints?.off === undefined ? [] : [{ label: words.off, description: input.hints.off }]),
  ],
  select: everyHint,
  segmented: everyHint,
  radio: EMPTY,
  multi: everyHint,
  slider: sliderHints,
  number: EMPTY,
  text: EMPTY,
  password: EMPTY,
  dynamic: EMPTY,
  color: EMPTY,
  keybind: EMPTY,
  tags: EMPTY,
  custom: EMPTY,
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

export { LINE_HINTS, VALUE_HINTS };
