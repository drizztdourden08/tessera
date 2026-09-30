/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { DisabledOverlay } from '../../DisabledOverlay';
import { partitionByLock } from '../behavior/partition-by-lock';
import type { SettingsSectionRowsProps } from './SettingsSectionRows.type';
import '../../../theme/search-hit.css';

const SettingsSectionRows = (props: SettingsSectionRowsProps) => {
  const { rows, renderLock, flashKey } = props;
  return partitionByLock(rows).map((run) => {
    const drawn = run.rows.map((row) => (
      <Box
        key={row.key}
        data-setting-key={row.key}
        className={`settings-section__row${row.key === flashKey ? ' search-hit' : ''}`}
      >
        {row.content}
      </Box>
    ));
    if (run.lock === null) return drawn;
    const first = run.rows[0]?.key ?? '';
    return (
      <Box key={`lock-${first}`} className="settings-section__run">
        {renderLock
          ? renderLock({ cause: run.lock, children: drawn })
          : <DisabledOverlay active contained message={run.lock}>{drawn}</DisabledOverlay>}
      </Box>
    );
  });
};

export { SettingsSectionRows };
