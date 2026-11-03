/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { clampNumber } from '../../primitives/value-rule/clamp-number';
import { cellCount } from '../cell-geometry';
import { scrubDataset } from './behavior/scrub-dataset';
import { scrubPlacement } from './behavior/scrub-placement';
import { useScrubRuler } from './behavior/useScrubRuler';
import { ScrubBandSlot } from './sub-components/ScrubBandSlot';
import { ScrubBandView } from './sub-components/ScrubBandView';
import { ScrubMarker } from './sub-components/ScrubMarker';
import { ScrubTrack } from './sub-components/ScrubTrack';
import type { ScrubRulerProps } from './ScrubRuler.type';
import './ScrubRuler.css';

const ScrubRuler = (props: ScrubRulerProps) => {
  const { cells, value, onChange, tickLabel, tickEvery, markers = [], onMarkerChange, markerAnchor, band = null, onBandChange, bandLabel, secondBand, onCellContextMenu, compact, valueText, label, readOnly = false, className } = props;
  const total = cellCount(cells);
  const current = clampNumber(value, 0, Math.max(0, total - 1));
  const ruler = useScrubRuler({ cells, total, value: current, readOnly, onChange, onBandChange, onCellContextMenu });
  if (total === 0) return null;

  return (
    <Box
      className={['scrub-ruler', className].filter(Boolean).join(' ')}
      style={scrubPlacement(cells, total, current)}
      {...scrubDataset(ruler.scrubbing, readOnly, compact)}
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
        onContextMenu={ruler.onContextMenu}
      />
      <ScrubBandSlot cells={cells} total={total} band={ruler.draftBand ?? band} draft={ruler.draftBand !== null} readOnly={readOnly} bandLabel={bandLabel} onBandChange={onBandChange} />
      {secondBand && <ScrubBandView cells={cells} total={total} band={secondBand} draft={false} second title="" />}
      {markers.map((marker) => (
        <ScrubMarker key={marker.id} cells={cells} total={total} marker={marker} anchor={markerAnchor} value={current} readOnly={readOnly} onMarkerChange={onMarkerChange} />
      ))}
    </Box>
  );
};

export { ScrubRuler };
