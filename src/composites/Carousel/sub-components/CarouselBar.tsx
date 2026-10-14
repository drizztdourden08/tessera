/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Flex } from '../../../primitives/Flex';
import { Pressable } from '../../../primitives/Pressable';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { CarouselBarProps } from '../Carousel.type';
import { CarouselButton } from './CarouselButton';

const CarouselBar = ({ slides, state, mask }: CarouselBarProps) => {
  const { carousel } = useTesseraStrings();
  return (
    <Flex align="center" justify="center" gap="sm" className="carousel__bar">
      {state.canTurn && (
        <CarouselButton icon={state.stopped ? 'play' : 'pause'} label={state.stopped ? carousel.start : carousel.stop} onPress={state.toggleStopped} />
      )}
      <CarouselButton icon="chevron-left" label={carousel.previous} onPress={() => state.step(-1)} />
      <Box role="group" aria-label={carousel.slides} className="carousel__dots" {...mask}>
        {slides.map((slide, i) => (
          <Pressable
            key={slide.id}
            className="carousel__dot"
            aria-label={carousel.show(slide.label)}
            aria-current={i === state.index || undefined}
            onClick={() => state.go(i)}
          />
        ))}
      </Box>
      <CarouselButton icon="chevron-right" label={carousel.next} onPress={() => state.step(1)} />
    </Flex>
  );
};

export { CarouselBar };
