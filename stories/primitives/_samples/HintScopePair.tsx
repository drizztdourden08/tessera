/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Flex, HintLine, HintScope, SegmentedControl, Text, ToggleGroup } from '../../../src/primitives';
import { DOCK_OPTIONS } from './dock-options.constants';
import { HintEcho } from './HintEcho';
import { TRACKER_LAYERS } from './hint-scope-layers.constants';
import './SegmentHintDemo.css';

const HintScopePair = () => {
  const [dock, setDock] = useState('left');
  const [layers, setLayers] = useState<string[]>(['items']);
  return (
    <Flex gap="lg" align="start" wrap>
      <HintScope>
        <Box className="segment-hint-demo__panel">
          <Text className="story-label">Map, read by HintLine</Text>
          <SegmentedControl size="sm" aria-label="Map placement" value={dock} options={DOCK_OPTIONS} onChange={setDock} />
          <HintLine className="segment-hint-demo__line" />
        </Box>
      </HintScope>
      <HintScope>
        <Box className="segment-hint-demo__panel">
          <Text className="story-label">Tracker, read by useHint</Text>
          <ToggleGroup size="sm" value={layers} options={TRACKER_LAYERS} onChange={setLayers} />
          <HintEcho />
        </Box>
      </HintScope>
    </Flex>
  );
};

export { HintScopePair };
