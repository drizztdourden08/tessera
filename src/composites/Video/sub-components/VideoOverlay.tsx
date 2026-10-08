/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Spinner } from '../../../primitives/Spinner';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Paragraph } from '../../../primitives/text-elements';
import { RetryButton } from '../../RetryButton';
import './VideoOverlay.css';
import type { VideoOverlayProps } from './VideoOverlay.type';

const VideoOverlay = (props: VideoOverlayProps) => {
  const { media, controls, errorMessage, onPlay, onRetry } = props;
  const { common, video } = useTesseraStrings();

  if (media.failed) {
    return (
      <Box className="video-overlay video-overlay--error" role="alert">
        <Icon name="circle-alert" size={28} className="video-overlay__error-icon" />
        <Paragraph className="video-overlay__message">{errorMessage}</Paragraph>
        {controls && <RetryButton onRetry={onRetry} />}
      </Box>
    );
  }
  if (!controls) return null;
  if (media.waiting) {
    return (
      <Box className="video-overlay">
        <Spinner size="lg" />
      </Box>
    );
  }
  if (media.started && !media.ended) return null;
  return (
    <Box className="video-overlay">
      <IconButton variant="primary" className="video-overlay__play" label={media.ended ? video.replay : common.play} onClick={onPlay}>
        <Icon name={media.ended ? 'rotate-ccw' : 'play'} size={28} />
      </IconButton>
    </Box>
  );
};

export { VideoOverlay };
