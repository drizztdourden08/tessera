/* @layer stories @kind story */
import { useState } from 'react';
import { ScrubRuler } from '../../../src/composites';
import type { RulerBand, RulerMarker } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { TIME_CELLS, UNIFORM_CELLS } from './cell-demo';
import type { ScrubRulerDemoProps } from './ScrubRulerDemo.type';

const SAMPLE_MARKERS: readonly RulerMarker[] = [
  { id: 'hit', index: 4, min: 0, max: 15, label: 'Hit', tone: 'rose' },
  { id: 'land', index: 11, min: 0, max: 15, label: 'Land', tone: 'teal' },
];

const EMPTY_CELLS = { lefts: [], widths: [] };

const ScrubRulerDemo = (props: ScrubRulerDemoProps) => {
  const { time = false, markers = false, withBand = false, readOnly = false, empty = false } = props;
  const [value, setValue] = useState(3);
  const [band, setBand] = useState<RulerBand | null>(withBand ? { from: 5, to: 9 } : null);
  const [spots, setSpots] = useState(SAMPLE_MARKERS);
  const cells = time ? TIME_CELLS : UNIFORM_CELLS;
  return (
    <Box className="story-column">
      <ScrubRuler
        cells={empty ? EMPTY_CELLS : cells}
        value={value}
        onChange={setValue}
        markers={markers ? spots : undefined}
        onMarkerChange={(id, index) => setSpots(spots.map((spot) => (spot.id === id ? { ...spot, index } : spot)))}
        band={band}
        onBandChange={setBand}
        readOnly={readOnly}
      />
    </Box>
  );
};

export { ScrubRulerDemo };
