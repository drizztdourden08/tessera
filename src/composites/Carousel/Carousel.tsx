/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { REVIEW_MASK } from '../../primitives/dom/review-mask.constants';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useCarousel } from './behavior/useCarousel';
import type { CarouselProps } from './Carousel.type';
import { CarouselBar } from './sub-components/CarouselBar';
import './Carousel.css';

const Carousel = (props: CarouselProps) => {
  const { slides, label, index, defaultIndex = 0, onIndexChange, turnEvery = null, className } = props;
  const { carousel } = useTesseraStrings();
  const ref = useRef<HTMLElement>(null);
  const state = useCarousel({ count: slides.length, index, defaultIndex, onIndexChange, turnEvery, ref });
  const mask = state.canTurn && !state.stopped ? REVIEW_MASK : undefined;

  return (
    <Box
      ref={ref}
      as="section"
      aria-roledescription={carousel.carousel}
      aria-label={label}
      className={['carousel', className].filter(Boolean).join(' ')}
      {...state.hold}
    >
      <Box className="carousel__viewport" aria-live={state.turning ? 'off' : 'polite'} {...mask}>
        {slides.map((slide, i) => (
          <Box
            key={slide.id}
            role="group"
            aria-roledescription={carousel.slide}
            aria-label={carousel.position(i + 1, slides.length, slide.label)}
            className="carousel__slide"
            data-active={i === state.index || undefined}
            inert={i !== state.index}
          >
            {slide.content}
          </Box>
        ))}
      </Box>
      {slides.length > 1 && <CarouselBar slides={slides} state={state} mask={mask} />}
    </Box>
  );
};

export { Carousel };
