/* @layer stories @kind logic */
import type { SettingsItem, SettingsSectionRow } from '../../../src/composites';

const isSettingsRowItem = (row: SettingsSectionRow): row is SettingsItem => 'input' in row;

export { isSettingsRowItem };
