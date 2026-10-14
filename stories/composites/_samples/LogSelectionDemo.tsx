/* @layer stories @kind component */
import { useState } from 'react';
import { CopyButton, LogPanel } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { LOG_KINDS, LOG_ROWS } from './data-log';

const START: ReadonlySet<string> = new Set(LOG_ROWS.slice(5, 8).map((row) => row.id));

const LogSelectionDemo = () => {
  const [selected, setSelected] = useState<ReadonlySet<string>>(START);
  const picked = LOG_ROWS.filter((row) => selected.has(row.id));
  const extra = (
    <CopyButton
      text={() => picked.map((row) => `${row.gutter} ${row.tag} ${row.message}`).join('\n')}
      label={`Copy ${picked.length} selected`}
      showLabel
      variant="secondary"
      disabled={picked.length === 0}
    />
  );
  return (
    <Box className="log-panel-story">
      <LogPanel
        rows={LOG_ROWS}
        kinds={LOG_KINDS}
        className="server-log"
        countLabel="lines"
        selectedIds={selected}
        onSelectionChange={setSelected}
        toolbarExtra={extra}
      />
    </Box>
  );
};

export { LogSelectionDemo };
