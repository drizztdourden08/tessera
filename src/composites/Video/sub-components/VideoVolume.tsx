/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { VolumeIcon } from '../../../primitives/VolumeIcon';
import { toPercent } from '../behavior/to-percent';
import { VOLUME_STEP } from '../Video.constants';
import './VideoVolume.css';
import type { VideoVolumeProps } from './VideoVolume.type';
import { VideoTrack } from '../../../primitives/media/VideoTrack';

const VideoVolume = (props: VideoVolumeProps) => {
  const { volume, muted, onVolume, onToggleMute } = props;
  const { common } = useTesseraStrings();
  const level = muted ? 0 : volume;

  return (
    <Box className="video-volume">
      <IconButton className="video-bar__button" label={level === 0 ? common.unmute : common.mute} onClick={onToggleMute}>
        <VolumeIcon level={volume} muted={muted} size={18} />
      </IconButton>
      <VideoTrack
        className="video-volume__input"
        min={0}
        max={1}
        step={VOLUME_STEP}
        value={level}
        fill={toPercent(level, 1)}
        aria-label={common.volume}
        aria-valuetext={`${Math.round(level * 100)}%`}
        onChange={(event) => onVolume(Number(event.target.value))}
      />
    </Box>
  );
};

export { VideoVolume };
