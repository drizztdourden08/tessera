/* @layer renderer-components @kind logic */
import type { SettingsRun, SettingsSectionRow } from '../SettingsSection.type';

const partitionByLock = (rows: readonly SettingsSectionRow[]): SettingsRun[] => {
  const runs: SettingsRun[] = [];
  for (const row of rows) {
    const lock = row.lock ?? null;
    const current = runs.at(-1);
    if (current?.lock === lock) current.rows.push(row);
    else runs.push({ lock, rows: [row] });
  }
  return runs;
};

export { partitionByLock };
