/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { Tooltip } from '../../../primitives/Tooltip';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CarouselButton } from '../../Carousel/sub-components/CarouselButton';
import type { MediaViewerZoomProps } from '../MediaViewer.type';

const MediaViewerZoom = ({ state }: MediaViewerZoomProps) => {
  const { mediaViewer } = useTesseraStrings();
  return (
    <Flex align="center" gap="xs" className="media-viewer__zoom">
      <CarouselButton icon="zoom-out" label={mediaViewer.zoomOut} disabled={!state.canOut} onPress={state.zoomOut} />
      <Tooltip content={mediaViewer.fitOrActual}>
        <Button variant="secondary" size="sm" aria-description={mediaViewer.fitOrActual} className="media-viewer__level" onClick={state.toggle}>
          {state.zoom === 'fit' ? mediaViewer.fit : mediaViewer.percent(state.zoom)}
        </Button>
      </Tooltip>
      <CarouselButton icon="zoom-in" label={mediaViewer.zoomIn} disabled={!state.canIn} onPress={state.zoomIn} />
    </Flex>
  );
};

export { MediaViewerZoom };
