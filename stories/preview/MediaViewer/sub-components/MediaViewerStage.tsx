/* @layer stories @kind component */
import type { SyntheticEvent } from 'react';
import { Video } from '../../../../src/composites';
import { Box } from '../../../../src/primitives';
import { ImageElement } from '../../../../src/primitives/media/ImageElement';
import { crispOf, scaleOf } from '../behavior/media-scale';
import { usePan } from '../behavior/usePan';
import type { MediaViewerStageProps } from '../MediaViewer.type';

const MediaViewerStage = (props: MediaViewerStageProps) => {
  const { item, zoom, startAt, pixelated, natural, onNatural, stageRef } = props;
  const scale = scaleOf(item, zoom, natural);
  const pan = usePan(scale !== null);

  const measure = (event: SyntheticEvent<HTMLImageElement>) => {
    onNatural({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight });
  };
  const seek = (event: SyntheticEvent<HTMLVideoElement>) => {
    if (startAt > 0) event.currentTarget.currentTime = startAt;
  };

  return (
    <Box ref={stageRef} className="media-viewer__stage" data-zoom={scale === null ? 'fit' : 'actual'} {...pan}>
      {item.kind === 'image' ? (
        <ImageElement
          key={item.id}
          src={item.src}
          alt={item.name}
          draggable={false}
          data-pixelated={crispOf(pixelated, natural) || undefined}
          className="media-viewer__media"
          width={scale !== null && natural ? natural.width * scale : undefined}
          height={scale !== null && natural ? natural.height * scale : undefined}
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
