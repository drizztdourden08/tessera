/* @layer renderer-components @kind logic */
import type { SettingsInput } from '../../SettingsRow';
import type { SettingsSectionRow } from '../SettingsSection.type';
import { isSettingsItem } from './is-settings-item';

const inputText = (input: SettingsInput): string[] => {
  if (!('options' in input)) return [];
  return input.options.flatMap((option) => [option.label, option.hint ?? '']);
};

const rowText = (row: SettingsSectionRow): string => {
  if (!isSettingsItem(row)) return [row.title ?? '', row.keywords ?? ''].join(' ').toLowerCase();
  return [row.title, row.description ?? '', row.hint ?? '', row.keywords ?? '', ...inputText(row.input)].join(' ').toLowerCase();
};

export { rowText };
