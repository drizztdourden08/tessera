/* @layer stories @kind component */
import { Box, Flex, Icon, IconButton, Pressable } from '../../../../src/primitives';
import { CAROUSEL_STRINGS } from '../carousel-strings.constants';
import type { CarouselBarProps } from '../Carousel.type';

const CarouselBar = ({ slides, state }: CarouselBarProps) => (
  <Flex align="center" justify="center" gap="sm" className="carousel__bar">
    {state.canTurn && (
      <IconButton variant="ghost" size="sm" label={state.stopped ? CAROUSEL_STRINGS.start : CAROUSEL_STRINGS.stop} onClick={state.toggleStopped}>
        <Icon name={state.stopped ? 'play' : 'pause'} />
      </IconButton>
    )}
    <IconButton variant="ghost" size="sm" label={CAROUSEL_STRINGS.previous} onClick={() => state.step(-1)}>
      <Icon name="chevron-left" />
    </IconButton>
    <Box role="group" aria-label={CAROUSEL_STRINGS.pick} className="carousel__dots">
      {slides.map((slide, i) => (
        <Pressable
          key={slide.id}
          className="carousel__dot"
          aria-label={CAROUSEL_STRINGS.show(slide.label)}
          aria-current={i === state.index || undefined}
          onClick={() => state.go(i)}
        />
      ))}
    </Box>
    <IconButton variant="ghost" size="sm" label={CAROUSEL_STRINGS.next} onClick={() => state.step(1)}>
      <Icon name="chevron-right" />
    </IconButton>
  </Flex>
);

export { CarouselBar };
