/* @layer renderer-components @kind logic */
import type { SettingsItem } from '../../SettingsRow';
import type { SettingsSectionRow } from '../SettingsSection.type';

const isSettingsItem = (row: SettingsSectionRow): row is SettingsItem => 'input' in row;

export { isSettingsItem };
