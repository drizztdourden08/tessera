/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ScrubTicks } from './ScrubTicks';
import type { ScrubTrackProps } from './ScrubTrack.type';

const plusOne = (index: number): string => String(index + 1);

const ScrubTrack = ({ cells, total, current, readOnly, tickLabel = plusOne, tickEvery = 'auto', valueText, label, onPress, onKeyDown }: ScrubTrackProps) => {
  const { scrubRuler } = useTesseraStrings();
  return (
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
      onPointerDown={onPress}
      onKeyDown={onKeyDown}
    >
      <ScrubTicks cells={cells} total={total} current={current} every={tickEvery} tickLabel={tickLabel} />
      <Box className="scrub-ruler__playhead" aria-hidden="true" />
    </Box>
  );
};

export { ScrubTrack };
