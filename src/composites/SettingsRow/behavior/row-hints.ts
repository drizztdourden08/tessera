/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { SettingsRowProps } from '../SettingsRow.type';
import { hintShown } from './hint-shown';
import { lineHints } from './line-hints';
import { restHints } from './rest-hints';
import type { RowHints, Words } from './row-hints.type';
import { uniqueHints } from './unique-hints';
import { valueHint } from './value-hint';

const wholeHint = (props: SettingsRowProps, rowHint: Hint | undefined, settings: Words): Hint | undefined =>
  (props.readOnly === true && props.input !== undefined ? valueHint(props.input, settings) ?? rowHint : rowHint);

const partHints = (props: SettingsRowProps, whole: Hint | undefined, settings: Words): readonly Hint[] => {
  if (props.readOnly === true) return whole === undefined ? [] : [whole];
  return props.input === undefined ? [] : lineHints(props.input, settings);
};

const resetHints = (props: SettingsRowProps, settings: Words): readonly Hint[] =>
  (props.changed === true && props.onReset && props.readOnly !== true ? [{ label: '', description: settings.resetHint }] : []);

const rowHints = (props: SettingsRowProps, settings: Words): RowHints => {
  const text = props.hint ?? '';
  const resting = text.trim() === '' ? '' : text;
  const rowHint: Hint | undefined = resting === '' ? undefined : { label: '', description: resting };
  const whole = wholeHint(props, rowHint, settings);
  const rest = restHints(props, settings);
  const every = uniqueHints([...(rowHint === undefined ? [] : [rowHint]), ...partHints(props, whole, settings), ...resetHints(props, settings)]);
  const current = rest.length === 0 || props.input === undefined ? undefined : valueHint(props.input, settings);
  return { resting, hints: every.filter((hint) => hintShown(hint, rest) !== undefined), whole, rest, current };
};

export { rowHints };
