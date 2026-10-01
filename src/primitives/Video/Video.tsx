/* @layer renderer-components @kind component */
import './Video.css';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import type { VideoProps } from './Video.type';
import { useVideoPlayer } from './behavior/useVideoPlayer';
import { VideoBar } from './sub-components/VideoBar';
import { VideoOverlay } from './sub-components/VideoOverlay';

const Video = (props: VideoProps) => {
  const {
    controls = true,
    label,
    errorMessage,
    className = '',
    style,
    ref,
    preload = 'metadata',
    theater,
    defaultTheater = false,
    onTheaterChange,
    onClick,
    ...native
  } = props;
  const { video } = useTesseraStrings();
  const player = useVideoPlayer({ ref, controls, className, onClick, theater, defaultTheater, onTheaterChange });
  const { media, actions } = player;

  return (
    <div {...player.frame} style={style} aria-label={label ?? video.playerLabel}>
      <video className="video__media" preload={preload} {...native} {...player.video} controls={false} />
      <VideoOverlay media={media} controls={controls} errorMessage={errorMessage ?? video.errorMessage} onPlay={actions.togglePlay} />
      {player.interactive && (
        <VideoBar
          media={media}
          actions={actions}
          fullscreen={player.fullscreen}
          pictureInPicture={player.pictureInPicture}
          theater={player.theater}
        />
      )}
    </div>
  );
};

export { Video };
