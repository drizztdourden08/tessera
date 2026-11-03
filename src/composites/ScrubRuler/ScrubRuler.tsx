/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { clampNumber } from '../../primitives/value-rule/clamp-number';
import { cellCount } from '../cell-geometry';
import { scrubPlacement } from './behavior/scrub-placement';
import { useScrubRuler } from './behavior/useScrubRuler';
import { ScrubBandSlot } from './sub-components/ScrubBandSlot';
import { ScrubMarker } from './sub-components/ScrubMarker';
import { ScrubTrack } from './sub-components/ScrubTrack';
import type { ScrubRulerProps } from './ScrubRuler.type';
import './ScrubRuler.css';

const ScrubRuler = (props: ScrubRulerProps) => {
  const { cells, value, onChange, tickLabel, tickEvery, markers = [], onMarkerChange, band = null, onBandChange, bandLabel, valueText, label, readOnly = false, className } = props;
  const total = cellCount(cells);
  const current = clampNumber(value, 0, Math.max(0, total - 1));
  const ruler = useScrubRuler({ cells, total, value: current, readOnly, onChange, onBandChange });
  if (total === 0) return null;

  return (
    <Box
      className={['scrub-ruler', className].filter(Boolean).join(' ')}
      style={scrubPlacement(cells, total, current)}
      data-scrubbing={ruler.scrubbing || undefined}
      data-read-only={readOnly || undefined}
    >
      <ScrubTrack
        cells={cells}
        total={total}
        current={current}
        readOnly={readOnly}
        tickLabel={tickLabel}
        tickEvery={tickEvery}
        valueText={valueText}
        label={label}
        onPress={ruler.press}
        onKeyDown={ruler.onKeyDown}
      />
      <ScrubBandSlot cells={cells} total={total} band={ruler.draftBand ?? band} draft={ruler.draftBand !== null} readOnly={readOnly} bandLabel={bandLabel} onBandChange={onBandChange} />
      {markers.map((marker) => (
        <ScrubMarker key={marker.id} cells={cells} total={total} marker={marker} value={current} readOnly={readOnly} onMarkerChange={onMarkerChange} />
      ))}
    </Box>
  );
};

export { ScrubRuler };
