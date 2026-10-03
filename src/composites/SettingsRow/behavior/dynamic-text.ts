/* @layer renderer-components @kind logic */
import type { SettingsInputOf } from '../SettingsRow.type';

const dynamicText = (input: SettingsInputOf<'dynamic'>): string =>
  input.text?.(input.value) ?? Object.values(input.value).filter((part) => part !== null && part !== '').join(' ');

export { dynamicText };
