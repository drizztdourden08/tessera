/* @layer renderer-components @kind logic */
import type { SettingsOption } from '../SettingsRow.type';

const choiceLabel = (options: readonly SettingsOption[], value: string): string =>
  options.find((option) => option.value === value)?.label ?? value;

export { choiceLabel };
