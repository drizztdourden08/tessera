/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Slider } from '../../primitives/Slider';
import { useVolumeParts } from './behavior/useVolumeParts';
import { VolumeMuteButton } from './sub-components/VolumeMuteButton';
import { VolumePopover } from './sub-components/VolumePopover';
import { VolumeText } from './sub-components/VolumeText';
import './VolumeControl.css';
import type { VolumeControlProps } from './VolumeControl.type';

const VolumeControl = (props: VolumeControlProps) => {
  const { label, description, showValue, labels, disabled = false, slider: kind = 'inline', orientation = 'vertical', className } = props;
  const { range, size, button, slider } = useVolumeParts(props);
  const classes = ['volume-control', `volume-control--${kind}`, `control-size--${size}`, disabled && 'volume-control--disabled', className];

  return (
    <Box className={classes.filter(Boolean).join(' ')}>
      <VolumeText label={label} description={description} />
      {kind === 'popover'
        ? <VolumePopover button={button} slider={slider} orientation={orientation} range={range} />
        : (
          <Box className="volume-control__body">
            <VolumeMuteButton {...button} />
            <Slider {...slider} className="volume-control__slider" size={size} showValue={showValue} labels={labels} />
          </Box>
        )}
    </Box>
  );
};

export { VolumeControl };
