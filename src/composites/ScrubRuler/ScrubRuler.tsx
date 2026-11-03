/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { clampNumber } from '../../primitives/value-rule/clamp-number';
import { borderX, cellCount } from '../cell-geometry';
import { useScrubRuler } from './behavior/useScrubRuler';
import { ScrubBandView } from './sub-components/ScrubBandView';
import { ScrubMarker } from './sub-components/ScrubMarker';
import { ScrubTicks } from './sub-components/ScrubTicks';
import type { ScrubRulerProps } from './ScrubRuler.type';
import './ScrubRuler.css';

const plusOne = (index: number): string => String(index + 1);

const ScrubRuler = (props: ScrubRulerProps) => {
  const { cells, value, onChange, tickLabel = plusOne, tickEvery = 'auto', markers = [], onMarkerChange, band = null, onBandChange, bandLabel, valueText, label, readOnly = false, className } = props;
  const { scrubRuler } = useTesseraStrings();
  const total = cellCount(cells);
  const current = clampNumber(value, 0, Math.max(0, total - 1));
  const ruler = useScrubRuler({ cells, total, value: current, readOnly, onChange, onBandChange });
  if (total === 0) return null;
  const shown = ruler.draftBand ?? band;
  const placed = { '--scrub-width': `${borderX(cells, total, total)}px`, '--scrub-left': `${cells.lefts[current] ?? 0}px`, '--scrub-cell': `${cells.widths[current] ?? 0}px` } as CSSProperties;

  return (
    <Box
      className={['scrub-ruler', className].filter(Boolean).join(' ')}
      style={placed}
      data-scrubbing={ruler.scrubbing || undefined}
      data-read-only={readOnly || undefined}
    >
      <Box
        role="slider"
        tabIndex={readOnly ? -1 : 0}
        aria-label={label ?? scrubRuler.label}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current + 1}
        aria-valuetext={(valueText ?? scrubRuler.valueText)(current, total)}
        aria-readonly={readOnly || undefined}
        className="scrub-ruler__track"
        onPointerDown={ruler.press}
        onKeyDown={ruler.onKeyDown}
      >
        <ScrubTicks cells={cells} total={total} current={current} every={tickEvery} tickLabel={tickLabel} />
        <Box className="scrub-ruler__playhead" aria-hidden="true" />
      </Box>
      {shown && (
        <ScrubBandView
          cells={cells}
          total={total}
          band={shown}
          draft={ruler.draftBand !== null}
          title={bandLabel ? bandLabel(shown) : scrubRuler.clearBand}
          onClear={readOnly || !onBandChange ? undefined : () => onBandChange(null)}
        />
      )}
      {markers.map((marker) => (
        <ScrubMarker key={marker.id} cells={cells} total={total} marker={marker} value={current} readOnly={readOnly} onMarkerChange={onMarkerChange} />
      ))}
    </Box>
  );
};

export { ScrubRuler };
