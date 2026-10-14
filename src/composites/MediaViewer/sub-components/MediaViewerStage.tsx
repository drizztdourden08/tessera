/* @layer renderer-components @kind component */
import type { SyntheticEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Image } from '../../../primitives/Image';
import { Video } from '../../Video';
import { crispOf } from '../behavior/crisp-of';
import { shownSize } from '../behavior/shown-size';
import { usePan } from '../behavior/usePan';
import type { MediaViewerStageProps } from '../MediaViewer.type';

const MediaViewerStage = (props: MediaViewerStageProps) => {
  const { item, zoom, startAt, pixelated, natural, onNatural, stageRef } = props;
  const pan = usePan(item.kind === 'image' && zoom.zoom !== 'fit');

  const measure = (event: SyntheticEvent<HTMLImageElement>) => {
    onNatural({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight });
  };
  const seek = (event: SyntheticEvent<HTMLVideoElement>) => {
    if (startAt > 0) event.currentTarget.currentTime = startAt;
  };

  return (
    <Box ref={stageRef} className="media-viewer__stage" data-zoom={zoom.zoom === 'fit' ? 'fit' : 'actual'} data-kind={item.kind} {...pan}>
      {item.kind === 'image' ? (
        <Image
          key={item.id}
          src={item.src}
          alt={item.name}
          draggable={false}
          data-pixelated={crispOf(pixelated, natural) || undefined}
          className="media-viewer__media"
          {...shownSize(natural, zoom.scale)}
          onLoad={measure}
          onDoubleClick={zoom.toggle}
        />
      ) : (
        <Video key={item.id} src={item.src} poster={item.poster} label={item.name} autoPlay onLoadedMetadata={seek} className="media-viewer__media media-viewer__media--video" />
      )}
    </Box>
  );
};

export { MediaViewerStage };
