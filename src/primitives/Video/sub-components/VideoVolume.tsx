/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { toPercent } from '../behavior/to-percent';
import { volumeIcon } from '../behavior/volume-icon';
import { VOLUME_STEP } from '../Video.constants';
import './VideoVolume.css';
import type { VideoVolumeProps } from './VideoVolume.type';
import { VideoTrack } from './VideoTrack';

const VideoVolume = (props: VideoVolumeProps) => {
  const { volume, muted, onVolume, onToggleMute } = props;
  const { common, video } = useTesseraStrings();
  const level = muted ? 0 : volume;

  return (
    <div className="video-volume">
      <IconButton className="video-bar__button" label={level === 0 ? common.unmute : common.mute} onClick={onToggleMute}>
        <Icon name={volumeIcon(volume, muted)} size={18} />
      </IconButton>
      <VideoTrack
        className="video-volume__input"
        min={0}
        max={1}
        step={VOLUME_STEP}
        value={level}
        fill={toPercent(level, 1)}
        aria-label={video.volume}
        aria-valuetext={`${Math.round(level * 100)}%`}
        onChange={(event) => onVolume(Number(event.target.value))}
      />
    </div>
  );
};

export { VideoVolume };
