/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import './VideoBar.css';
import type { VideoBarProps } from './VideoBar.type';
import { VideoRateMenu } from './VideoRateMenu';
import { VideoScreenButtons } from './VideoScreenButtons';
import { VideoSeek } from './VideoSeek';
import { VideoTime } from './VideoTime';
import { VideoVolume } from './VideoVolume';

const VideoBar = (props: VideoBarProps) => {
  const { media, actions, fullscreen, pictureInPicture, theater } = props;
  const playing = !media.paused;

  return (
    <div className="video-bar">
      <VideoSeek currentTime={media.currentTime} duration={media.duration} buffered={media.buffered} onSeek={actions.seekTo} />
      <div className="video-bar__row">
        <IconButton className="video-bar__button" label={playing ? 'Pause' : 'Play'} onClick={actions.togglePlay}>
          <Icon name={playing ? 'pause' : 'play'} size={18} />
        </IconButton>
        <VideoVolume volume={media.volume} muted={media.muted} onVolume={actions.setVolume} onToggleMute={actions.toggleMute} />
        <VideoTime currentTime={media.currentTime} duration={media.duration} />
        <span className="video-bar__spacer" />
        <VideoRateMenu rate={media.rate} onRate={actions.setRate} />
        <VideoScreenButtons fullscreen={fullscreen} pictureInPicture={pictureInPicture} theater={theater} />
      </div>
    </div>
  );
};

export { VideoBar };
