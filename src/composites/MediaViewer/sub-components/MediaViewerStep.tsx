/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CarouselButton } from '../../Carousel/sub-components/CarouselButton';
import type { MediaViewerStepProps } from '../MediaViewer.type';

const MediaViewerStep = ({ onStep }: MediaViewerStepProps) => {
  const { mediaViewer } = useTesseraStrings();
  return (
    <>
      <CarouselButton
        icon="chevron-left" label={mediaViewer.previous} variant="secondary" size="md" className="media-viewer__step media-viewer__step--back" onPress={() => onStep(-1)}
      />
      <CarouselButton
        icon="chevron-right" label={mediaViewer.next} variant="secondary" size="md" className="media-viewer__step media-viewer__step--on" onPress={() => onStep(1)}
      />
    </>
  );
};

export { MediaViewerStep };
