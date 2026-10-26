/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Shortcut } from '../../../primitives/Shortcut';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import { H3 } from '../../../primitives/Title';
import { ICON_SIZE, SHOWN_KEYS } from '../GuidedTour.constants';
import { TourBubbleButtons } from './TourBubbleButtons';
import type { TourBubbleCardProps } from './TourBubble.type';

const TourBubbleCard = (props: TourBubbleCardProps) => {
  const { tour, step, id } = props;
  const { stepper, tour: words } = useTesseraStrings();
  const advance = step.advance ?? 'next';

  return (
    <>
      <Box className="guided-tour__head">
        <Span className="guided-tour__count">{stepper.stepOf(tour.index + 1, tour.total)}</Span>
        <IconButton label={words.closeTour} variant="ghost" size="xs" onClick={tour.close}>
          <Icon name="x" size={ICON_SIZE} />
        </IconButton>
      </Box>
      {step.intro && step.art && <Box className="guided-tour__art">{step.art}</Box>}
      <H3 id={`${id}-title`} className="guided-tour__title">{step.title}</H3>
      <Box id={`${id}-body`} className="guided-tour__body">{step.body}</Box>
      {advance !== 'next' && (
        <Span className="guided-tour__hint">
          <Icon name={advance === 'click' ? 'mouse' : 'clock'} size={ICON_SIZE} />
          <Span>{step.hint ?? (advance === 'click' ? words.clickToGo : words.waitToGo)}</Span>
        </Span>
      )}
      <Box className="guided-tour__actions">
        <Span className="guided-tour__keys" aria-hidden>
          {SHOWN_KEYS.map((binding) => <Shortcut key={binding.key} keys={binding.keys} size="xs" />)}
        </Span>
        <TourBubbleButtons tour={tour} step={step} advance={advance} />
      </Box>
    </>
  );
};

export { TourBubbleCard };
