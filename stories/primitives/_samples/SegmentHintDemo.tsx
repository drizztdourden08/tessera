/* @layer stories @kind component */
import { useState } from 'react';
import { Box, HintLine, HintScope, SegmentedControl, Text } from '../../../src/primitives';
import type { Hint } from '../../../src/primitives';
import { DOCK_OPTIONS, VIEW_OPTIONS } from './dock-options.constants';
import './SegmentHintDemo.css';

const SegmentHintDemo = () => {
  const [dock, setDock] = useState('right');
  const [view, setView] = useState('context');
  const [reported, setReported] = useState<Hint | null>(null);

  return (
    <Box className="story-column segment-hint-demo">
      <HintScope>
        <Box className="segment-hint-demo__panel">
          <Box className="segment-hint-demo__row">
            <Text className="story-label">Placement</Text>
            <SegmentedControl size="xs" aria-label="Placement" value={dock} options={DOCK_OPTIONS} onChange={setDock} onHint={setReported} />
          </Box>
          <Box className="segment-hint-demo__row">
            <Text className="story-label">Show</Text>
            <SegmentedControl size="xs" aria-label="Show" value={view} options={VIEW_OPTIONS} onChange={setView} />
          </Box>
          <HintLine className="segment-hint-demo__line" />
        </Box>
      </HintScope>
      <Text className="story-label">
        {`Placement onHint: ${reported ? `${reported.label}, ${reported.description}` : 'null'} · value: ${dock} / ${view}`}
      </Text>
    </Box>
  );
};

export { SegmentHintDemo };
