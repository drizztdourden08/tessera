/* @layer stories @kind component */
import { useState } from 'react';
import { Box, HintLine, HintScope, Icon, IconButton, SegmentedControl, Slider, Text, Toggle, ToggleGroup } from '../../../src/primitives';
import { DOCK_OPTIONS } from './dock-options.constants';
import './SegmentHintDemo.css';

const LAYERS = [
  { value: 'grid', label: 'Grid', hint: { label: 'Grid', description: 'Draws the tile grid over the map' } },
  { value: 'names', label: 'Names', hint: { label: 'Names', description: 'Writes each room name in its room' } },
];

const HintScopeDemo = () => {
  const [dock, setDock] = useState('left');
  const [snap, setSnap] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [layers, setLayers] = useState<string[]>(['grid']);

  return (
    <HintScope>
      <Box className="segment-hint-demo__panel">
        <Box className="segment-hint-demo__row">
          <Text className="story-label">Map</Text>
          <IconButton size="xs" label="Recentre" hint={{ label: 'Recentre', description: 'Puts the player back in the middle' }}>
            <Icon name="compass" size={12} />
          </IconButton>
        </Box>
        <Box className="segment-hint-demo__row">
          <Text className="story-label">Placement</Text>
          <SegmentedControl size="xs" aria-label="Placement" value={dock} options={DOCK_OPTIONS} onChange={setDock} />
        </Box>
        <Box className="segment-hint-demo__row">
          <Text className="story-label">Layers</Text>
          <ToggleGroup value={layers} options={LAYERS} onChange={setLayers} />
        </Box>
        <Box className="segment-hint-demo__row">
          <Text className="story-label">Snap</Text>
          <Toggle size="xs" checked={snap} onChange={setSnap} hint={{ label: snap ? 'Snap on' : 'Snap off', description: 'Pulls the map to the nearest room' }} />
        </Box>
        <Box className="segment-hint-demo__row">
          <Text className="story-label">Zoom</Text>
          <Slider size="xs" value={zoom} min={50} max={200} step={10} onChange={setZoom} formatValue={(v) => `${v}%`} hint={{ label: `Zoom ${zoom}%`, description: 'How close the map is drawn' }} />
        </Box>
        <HintLine className="segment-hint-demo__line" />
      </Box>
    </HintScope>
  );
};

export { HintScopeDemo };
