/* @layer renderer-components @kind hook */
import { useControlSize } from '../../../primitives/field-control/useControlSize';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { VolumeControlProps, VolumeParts } from '../VolumeControl.type';
import { percentOfRange } from './percent-of-range';
import { useVolumeMute } from './useVolumeMute';
import { volumeRange } from './volume-range';

const useVolumeParts = (props: VolumeControlProps): VolumeParts => {
  const { label, disabled = false, onHint } = props;
  const range = volumeRange(props);
  const { min, max } = range;
  const { common } = useTesseraStrings();
  const size = useControlSize(props.size);
  const { muted, level, setLevel, toggle } = useVolumeMute(props);
  const formatValue = props.formatValue ?? percentOfRange(min, max);
  const name = label ?? common.volume;

  return {
    range,
    size,
    button: { muted, level: max > min ? (level - min) / (max - min) : 0, size, disabled, onToggle: toggle, onHint },
    slider: {
      ...range, value: level, onChange: setLevel, formatValue, disabled, onHint,
      'aria-label': name, hint: { label: `${name} ${formatValue(level)}`, description: common.volumeHint },
    },
  };
};

export { useVolumeParts };
