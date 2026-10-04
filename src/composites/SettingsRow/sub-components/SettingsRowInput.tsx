/* @layer renderer-components @kind component */
import { drawInput } from '../behavior/draw-input';
import { INPUT_RENDERERS } from '../behavior/input-renderers.constants';
import { VALUE_RENDERERS } from '../behavior/value-renderers.constants';
import { SettingsRowControl } from './SettingsRowControl';
import { SettingsRowValue } from './SettingsRowValue';
import type { SettingsRowInputProps } from './SettingsRowInput.type';

const SettingsRowInput = (props: SettingsRowInputProps) => {
  const { input, readOnly, context, handlers, pointed } = props;
  if (input === undefined) return null;
  if (readOnly) return <SettingsRowValue handlers={handlers}>{drawInput(VALUE_RENDERERS, input, context)}</SettingsRowValue>;
  return <SettingsRowControl bubble={context.compact} handlers={handlers} pointed={pointed}>{drawInput(INPUT_RENDERERS, input, context)}</SettingsRowControl>;
};

export { SettingsRowInput };
