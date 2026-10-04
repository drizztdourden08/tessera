/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { SettingsRowProps } from '../SettingsRow.type';
import { lineHints } from './line-hints';
import type { RowHints } from './row-hints.type';
import { uniqueHints } from './unique-hints';
import { valueHint } from './value-hint';

const rowHints = (props: SettingsRowProps, settings: TesseraStrings['settings']): RowHints => {
  const { hint, input, readOnly = false, changed = false, onReset } = props;
  const rowHint: Hint = { label: '', description: hint };
  const whole = readOnly ? valueHint(input, settings) ?? rowHint : rowHint;
  const reset: readonly Hint[] = changed && onReset && !readOnly ? [{ label: '', description: settings.resetHint }] : [];
  const hints = uniqueHints([rowHint, ...(readOnly ? [whole] : lineHints(input, settings)), ...reset]);
  return { resting: hint, hints, whole };
};

export { rowHints };
