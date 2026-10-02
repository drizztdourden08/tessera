/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useControlSize } from '../../primitives/field-control/useControlSize';
import { Slider } from '../../primitives/Slider';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { percentOfRange } from './behavior/percent-of-range';
import { useVolumeMute } from './behavior/useVolumeMute';
import { volumeIconName } from './behavior/volume-icon-name';
import { VolumeMuteButton } from './sub-components/VolumeMuteButton';
import { VolumeText } from './sub-components/VolumeText';
import './VolumeControl.css';
import type { VolumeControlProps } from './VolumeControl.type';

const VolumeControl = (props: VolumeControlProps) => {
  const { min = 0, max = 100, step = 1, label, description, showValue, labels, size, disabled = false, onHint, className } = props;
  const { common } = useTesseraStrings();
  const controlSize = useControlSize(size);
  const { muted, level, setLevel, toggle } = useVolumeMute(props);
  const formatValue = props.formatValue ?? percentOfRange(min, max);
  const name = label ?? common.volume;

  return (
    <Box className={['volume-control', `control-size--${controlSize}`, disabled && 'volume-control--disabled', className].filter(Boolean).join(' ')}>
      <VolumeText label={label} description={description} />
      <Box className="volume-control__body">
        <VolumeMuteButton
          muted={muted}
          icon={volumeIconName(level, min, max, muted)}
          size={controlSize}
          disabled={disabled}
          onToggle={toggle}
          onHint={onHint}
        />
        <Slider
          className="volume-control__slider"
          value={level}
          onChange={setLevel}
          min={min}
          max={max}
          step={step}
          size={controlSize}
          showValue={showValue}
          formatValue={formatValue}
          labels={labels}
          disabled={disabled}
          aria-label={name}
          hint={{ label: `${name} ${formatValue(level)}`, description: common.volumeHint }}
          onHint={onHint}
        />
      </Box>
    </Box>
  );
};

export { VolumeControl };
