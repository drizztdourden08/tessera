/* @layer stories @kind component */
import { useState } from 'react';
import { WindowTitleBar } from '../../../src/composites';
import type { WindowTitleBarAction } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';

const ignore = () => undefined;

const VolumeTitleBar = () => {
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const volumeAction: WindowTitleBarAction = { id: 'volume', label: 'Volume', bar: 'volume', value: volume, muted, onChange: setVolume, onMutedChange: setMuted, shortcut: 'Ctrl+M' };
  const actions: WindowTitleBarAction[] = [
    { id: 'search', icon: 'search', label: 'Search', onSelect: ignore },
    volumeAction,
    { id: 'report-bug', icon: 'bug', label: 'Report a bug', tone: 'danger', onSelect: ignore },
  ];
  return (
    <ValueReadout value={`${volume}, muted ${String(muted)}`}>
      <Box className="volume-story__bar">
        <WindowTitleBar title="Relic of the Past" actions={actions} onControl={ignore} />
      </Box>
    </ValueReadout>
  );
};

export { VolumeTitleBar };
