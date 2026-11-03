/* @layer stories @kind story */
import { useState } from 'react';
import { ScrubRuler } from '../../../src/composites';
import type { RulerBand, RulerMarker } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { UNIFORM_CELLS } from './cell-demo';

const LOOP: RulerBand = { from: 6, to: 11 };

const ONION: RulerBand = { from: 2, to: 5 };

const EDGE_MARKERS: readonly RulerMarker[] = [{ id: 'cut', index: 8, min: 0, max: 15, label: 'Cut', tone: 'violet' }];

const ScrubRulerExtras = () => {
  const [value, setValue] = useState(4);
  const [spots, setSpots] = useState(EDGE_MARKERS);
  const [note, setNote] = useState('Right-click a cell');
  return (
    <Box className="story-column">
      <ScrubRuler
        cells={UNIFORM_CELLS}
        value={value}
        onChange={setValue}
        band={LOOP}
        secondBand={ONION}
        markers={spots}
        markerAnchor="edge"
        onMarkerChange={(id, index) => setSpots(spots.map((spot) => (spot.id === id ? { ...spot, index } : spot)))}
        onCellContextMenu={(index, event) => {
          event.preventDefault();
          setNote(`Cell ${index + 1}`);
        }}
        compact
      />
      <Box role="status" className="story-label">{note}</Box>
    </Box>
  );
};

export { ScrubRulerExtras };
