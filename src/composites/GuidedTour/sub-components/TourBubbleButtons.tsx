/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { TourBubbleButtonsProps } from './TourBubble.type';

const TourBubbleButtons = (props: TourBubbleButtonsProps) => {
  const { tour, step, advance } = props;
  const { common, navigation, tour: words, wizard } = useTesseraStrings();
  const last = tour.index >= tour.total - 1;

  if (step.intro) {
    return (
      <>
        <Button variant="ghost" size="sm" onClick={tour.close}>{words.introSkip}</Button>
        <Button variant="primary" size="sm" onClick={tour.next} data-tour-start>{words.introStart}</Button>
      </>
    );
  }
  return (
    <>
      <Button variant="ghost" size="sm" onClick={tour.back} disabled={tour.index === 0}>{navigation.back}</Button>
      {advance === 'next' && <Button variant="primary" size="sm" onClick={tour.next}>{last ? common.done : wizard.next}</Button>}
    </>
  );
};

export { TourBubbleButtons };
