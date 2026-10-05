/* @layer renderer-components @kind component */
import { TourLayer } from './sub-components/TourLayer';
import type { GuidedTourProps } from './GuidedTour.type';
import './GuidedTour.css';

const GuidedTour = (props: GuidedTourProps) => {
  const { tour } = props;
  return tour.open && tour.current ? <TourLayer {...props} /> : null;
};

export { GuidedTour };
