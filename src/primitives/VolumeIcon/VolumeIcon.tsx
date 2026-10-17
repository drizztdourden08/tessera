/* @layer renderer-components @kind component */
import { Svg, SvgGroup, SvgPath } from '../Svg';
import { volumeStep } from './behavior/volume-step';
import { VOLUME_CROSS, VOLUME_ICON_BOX, VOLUME_SPEAKER, VOLUME_STROKE, VOLUME_WAVES } from './VolumeIcon.constants';
import type { VolumeIconProps } from './VolumeIcon.type';
import './VolumeIcon.css';

const VolumeIcon = (props: VolumeIconProps) => {
  const { level, muted = false, size = 16, className } = props;

  return (
    <Svg
      className={['volume-icon', className].filter(Boolean).join(' ')}
      data-step={volumeStep(level, muted)}
      viewBox={VOLUME_ICON_BOX}
      width={size}
      height={size}
      strokeWidth={VOLUME_STROKE}
      aria-hidden="true"
      focusable="false"
    >
      <SvgPath className="volume-icon__speaker" d={VOLUME_SPEAKER} />
      {VOLUME_WAVES.map((wave, index) => (
        <SvgGroup key={wave.up} className={`volume-icon__wave volume-icon__wave--${index + 1}`}>
          <SvgPath d={wave.up} pathLength={1} />
          <SvgPath d={wave.down} pathLength={1} />
        </SvgGroup>
      ))}
      <SvgGroup className="volume-icon__cross">
        {VOLUME_CROSS.map((line) => <SvgPath key={line} d={line} pathLength={1} />)}
      </SvgGroup>
    </Svg>
  );
};

export { VolumeIcon };
