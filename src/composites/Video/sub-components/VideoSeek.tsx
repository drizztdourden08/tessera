/* @layer renderer-components @kind component */
import type { CSSProperties, KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { formatTime } from '../behavior/format-time';
import { hasTimeline } from '../behavior/has-timeline';
import { seekTarget } from '../behavior/seek-target';
import { toPercent } from '../behavior/to-percent';
import { useSeekHover } from '../behavior/useSeekHover';
import './VideoSeek.css';
import type { VideoSeekProps } from './VideoSeek.type';
import { VideoTrack } from '../../../primitives/media/VideoTrack';

const VideoSeek = (props: VideoSeekProps) => {
  const { currentTime, duration, buffered, onSeek } = props;
  const { video } = useTesseraStrings();
  const { hover, handlePointerMove, handlePointerLeave } = useSeekHover();
  const seekable = hasTimeline(duration);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = seekTarget(event.key, currentTime, duration);
    if (target === null) return;
    event.preventDefault();
    onSeek(target);
  };

  return (
    <Box className="video-seek" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <VideoTrack
        className="video-seek__input"
        min={0}
        max={seekable ? duration : 1}
        step="any"
        value={seekable ? currentTime : 0}
        disabled={!seekable}
        fill={toPercent(currentTime, duration)}
        buffer={toPercent(buffered, duration)}
        aria-label={video.seek}
        aria-valuetext={video.timeOf(formatTime(currentTime), formatTime(duration))}
        onChange={(event) => onSeek(Number(event.target.value))}
        onKeyDown={handleKeyDown}
      />
      {seekable && hover !== null && (
        <Box as="span" className="video-seek__tip" aria-hidden style={{ '--video-hover': toPercent(hover, 1) } as CSSProperties}>
          {formatTime(hover * duration)}
        </Box>
      )}
    </Box>
  );
};

export { VideoSeek };
