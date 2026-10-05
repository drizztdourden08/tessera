/* @layer renderer-components @kind logic */
import type { SettingsInput } from '../../SettingsRow';
import type { SettingsSectionRow } from '../SettingsSection.type';
import { isSettingsItem } from './is-settings-item';

const inputText = (input: SettingsInput | undefined): string[] => {
  if (input === undefined || !('options' in input)) return [];
  return input.options.flatMap((option) => [option.label, option.hint ?? '']);
};

const rowText = (row: SettingsSectionRow): string => {
  const words = [row.title ?? '', row.description ?? '', row.hint, row.keywords ?? ''];
  const parts = isSettingsItem(row) ? [...inputText(row.input), ...(row.actions ?? []).map((action) => action.label)] : [];
  return [...words, ...parts].join(' ');
};

export { rowText };
