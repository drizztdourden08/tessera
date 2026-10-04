/* @layer renderer-components @kind logic */
import type { SettingsInput } from '../../SettingsRow';
import type { SettingsSectionRow } from '../SettingsSection.type';
import { isSettingsItem } from './is-settings-item';

const inputText = (input: SettingsInput): string[] => {
  if (!('options' in input)) return [];
  return input.options.flatMap((option) => [option.label, option.hint ?? '']);
};

const rowText = (row: SettingsSectionRow): string => {
  const words = [row.title ?? '', row.description ?? '', row.hint, row.keywords ?? ''];
  return (isSettingsItem(row) ? [...words, ...inputText(row.input)] : words).join(' ').toLowerCase();
};

export { rowText };
