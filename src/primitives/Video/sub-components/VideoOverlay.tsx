/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import { Spinner } from '../../Spinner';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { Paragraph } from '../../text-elements';
import './VideoOverlay.css';
import type { VideoOverlayProps } from './VideoOverlay.type';

const VideoOverlay = (props: VideoOverlayProps) => {
  const { media, controls, errorMessage, onPlay } = props;
  const { common, video } = useTesseraStrings();

  if (media.failed) {
    return (
      <div className="video-overlay video-overlay--error" role="alert">
        <Icon name="circle-alert" size={28} className="video-overlay__error-icon" />
        <Paragraph className="video-overlay__message">{errorMessage}</Paragraph>
      </div>
    );
  }
  if (!controls) return null;
  if (media.waiting) {
    return (
      <div className="video-overlay">
        <Spinner size="lg" />
      </div>
    );
  }
  if (media.started && !media.ended) return null;
  return (
    <div className="video-overlay">
      <IconButton variant="primary" className="video-overlay__play" label={media.ended ? video.replay : common.play} onClick={onPlay}>
        <Icon name={media.ended ? 'rotate-ccw' : 'play'} size={28} />
      </IconButton>
    </div>
  );
};

export { VideoOverlay };
