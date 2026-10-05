/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Shortcut } from '../../../primitives/Shortcut';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import { H3 } from '../../../primitives/Title';
import { ICON_SIZE, SHOWN_KEYS } from '../GuidedTour.constants';
import type { TourBubbleCardProps } from './TourBubble.type';

const TourBubbleCard = (props: TourBubbleCardProps) => {
  const { tour, step, id } = props;
  const { common, navigation, stepper, tour: words, wizard } = useTesseraStrings();
  const click = step.advance === 'click';
  const last = tour.index >= tour.total - 1;

  return (
    <>
      <Box className="guided-tour__head">
        <Span className="guided-tour__count">{stepper.stepOf(tour.index + 1, tour.total)}</Span>
        <IconButton label={words.closeTour} variant="ghost" size="xs" onClick={tour.close}>
          <Icon name="x" size={ICON_SIZE} />
        </IconButton>
      </Box>
      <H3 id={`${id}-title`} className="guided-tour__title">{step.title}</H3>
      <Box id={`${id}-body`} className="guided-tour__body">{step.body}</Box>
      {click && (
        <Span className="guided-tour__click">
          <Icon name="mouse" size={ICON_SIZE} />
          {words.clickToGo}
        </Span>
      )}
      <Box className="guided-tour__actions">
        <Span className="guided-tour__keys" aria-hidden>
          {SHOWN_KEYS.map((binding) => <Shortcut key={binding.key} keys={binding.keys} size="xs" />)}
        </Span>
        <Button variant="ghost" size="sm" onClick={tour.back} disabled={tour.index === 0}>{navigation.back}</Button>
        {!click && <Button variant="primary" size="sm" onClick={tour.next}>{last ? common.done : wizard.next}</Button>}
      </Box>
    </>
  );
};

export { TourBubbleCard };
