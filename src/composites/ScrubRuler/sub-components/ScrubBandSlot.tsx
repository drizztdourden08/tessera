/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ScrubBandView } from './ScrubBandView';
import type { ScrubBandSlotProps } from './ScrubBandSlot.type';

const ScrubBandSlot = ({ cells, total, band, draft, readOnly, bandLabel, onBandChange }: ScrubBandSlotProps) => {
  const { scrubRuler } = useTesseraStrings();
  if (!band) return null;
  return (
    <ScrubBandView
      cells={cells}
      total={total}
      band={band}
      draft={draft}
      title={bandLabel ? bandLabel(band) : scrubRuler.clearBand}
      onClear={readOnly || !onBandChange ? undefined : () => onBandChange(null)}
    />
  );
};

export { ScrubBandSlot };
