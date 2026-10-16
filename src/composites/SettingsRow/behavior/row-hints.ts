/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { SettingsRowProps } from '../SettingsRow.type';
import { hintShown } from './hint-shown';
import { lineHints } from './line-hints';
import { restHints } from './rest-hints';
import type { RowHints, Words } from './row-hints.type';
import { uniqueHints } from './unique-hints';
import { valueHint } from './value-hint';

const wholeHint = (props: SettingsRowProps, rowHint: Hint, settings: Words): Hint =>
  (props.readOnly === true && props.input !== undefined ? valueHint(props.input, settings) ?? rowHint : rowHint);

const partHints = (props: SettingsRowProps, whole: Hint, settings: Words): readonly Hint[] => {
  if (props.readOnly === true) return [whole];
  return props.input === undefined ? [] : lineHints(props.input, settings);
};

const resetHints = (props: SettingsRowProps, settings: Words): readonly Hint[] =>
  (props.changed === true && props.onReset && props.readOnly !== true ? [{ label: '', description: settings.resetHint }] : []);

const rowHints = (props: SettingsRowProps, settings: Words): RowHints => {
  const rowHint: Hint = { label: '', description: props.hint };
  const whole = wholeHint(props, rowHint, settings);
  const rest = restHints(props, settings);
  const every = uniqueHints([rowHint, ...partHints(props, whole, settings), ...resetHints(props, settings)]);
  const current = rest.length === 0 || props.input === undefined ? undefined : valueHint(props.input, settings);
  return { resting: props.hint, hints: every.filter((hint) => hintShown(hint, rest) !== undefined), whole, rest, current };
};

export { rowHints };
