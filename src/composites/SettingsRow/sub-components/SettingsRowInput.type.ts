/* @layer renderer-components @kind types */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { PointHandlers } from '../behavior/row-pointed.type';
import type { RenderContext } from '../behavior/renderers.type';
import type { SettingsInput } from '../SettingsRow.type';

interface SettingsRowInputProps {
  input?: SettingsInput;
  readOnly: boolean;
  context: RenderContext;
  handlers: PointHandlers;
  pointed?: Hint;
}

export type { SettingsRowInputProps };
