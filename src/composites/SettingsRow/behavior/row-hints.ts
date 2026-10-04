/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { SettingsRowProps } from '../SettingsRow.type';
import { lineHints } from './line-hints';
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
  return { resting: props.hint, hints: uniqueHints([rowHint, ...partHints(props, whole, settings), ...resetHints(props, settings)]), whole };
};

export { rowHints };
