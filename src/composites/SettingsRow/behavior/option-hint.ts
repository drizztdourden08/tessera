/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { SettingsOption } from '../SettingsRow.type';

const optionHint = (option: SettingsOption | undefined): Hint | undefined =>
  option?.hint === undefined ? undefined : { label: option.label, description: option.hint };

export { optionHint };
