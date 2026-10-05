/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Portal } from '../../../primitives/Portal';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import { useTourStage } from '../behavior/useTourStage';
import type { GuidedTourProps } from '../GuidedTour.type';
import { TourBubble } from './TourBubble';
import { TourMascot } from './TourMascot';
import { TourSpotlight } from './TourSpotlight';
import '../../../theme/visually-hidden.css';

const TourLayer = (props: GuidedTourProps) => {
  const { tour, mascot = 'auto', className } = props;
  const { tour: words } = useTesseraStrings();
  const stage = useTourStage(tour);
  const { step } = stage;

  return (
    <Portal layer="modal">
      <Box ref={stage.attach} className={['guided-tour', className].filter(Boolean).join(' ')} data-step={step?.id}>
        <TourSpotlight hole={stage.hole} view={stage.view} ringRef={stage.ringRef} />
        {mascot !== false && <TourMascot choice={mascot} area={stage.area} view={stage.view} clip={stage.clip} />}
        {step && <TourBubble key={tour.index} tour={tour} step={step} anchor={stage.target} hole={stage.hole} nodeRef={stage.setBubble} />}
        <Span className="visually-hidden" role="status" aria-live="polite">
          {step ? words.announce(tour.index + 1, tour.total, step.title) : ''}
        </Span>
      </Box>
    </Portal>
  );
};

export { TourLayer };
