/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import './VideoTrack.css';
import type { VideoTrackProps } from './VideoTrack.type';

const VideoTrack = (props: VideoTrackProps) => {
  const { fill, buffer = fill, className = '', ...rest } = props;
  const style = { '--video-fill': fill, '--video-buffer': buffer } as CSSProperties;
  return <input type="range" className={`video-track ${className}`} style={style} {...rest} />;
};

export { VideoTrack };
