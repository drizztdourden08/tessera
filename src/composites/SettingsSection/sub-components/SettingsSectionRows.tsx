/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { DisabledOverlay } from '../../DisabledOverlay';
import { SettingsRow } from '../../SettingsRow';
import { flashClass } from '../behavior/flash-class';
import { isSettingsItem } from '../behavior/is-settings-item';
import { partitionByLock } from '../behavior/partition-by-lock';
import type { SettingsSectionRow } from '../SettingsSection.type';
import type { SettingsSectionRowsProps } from './SettingsSectionRows.type';

const SettingsSectionRows = (props: SettingsSectionRowsProps) => {
  const { rows, flash, renderLock, compact, readOnly } = props;
  const drawRow = (row: SettingsSectionRow) => (isSettingsItem(row)
    ? <SettingsRow key={row.id} {...row} compact={compact} readOnly={readOnly} flash={row.id === flash} />
    : (
      <Box key={row.id} data-setting-key={row.id} className={['settings-section__row', flashClass(row.id, flash)].filter(Boolean).join(' ')}>
        {row.content}
      </Box>
    ));
  return partitionByLock(rows).map((run) => {
    const drawn = run.rows.map(drawRow);
    if (run.lock === null) return drawn;
    return (
      <Box key={`lock-${run.rows[0]?.id ?? ''}`} className="settings-section__run">
        {renderLock
          ? renderLock({ cause: run.lock, children: drawn })
          : <DisabledOverlay active contained message={run.lock}>{drawn}</DisabledOverlay>}
      </Box>
    );
  });
};

export { SettingsSectionRows };
