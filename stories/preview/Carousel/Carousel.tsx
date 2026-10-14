/* @layer stories @kind component */
import { useRef } from 'react';
import { Box } from '../../../src/primitives';
import { useCarousel } from './behavior/useCarousel';
import { CAROUSEL_STRINGS } from './carousel-strings.constants';
import type { CarouselProps } from './Carousel.type';
import { CarouselBar } from './sub-components/CarouselBar';
import './Carousel.css';

const Carousel = (props: CarouselProps) => {
  const { slides, label, index, defaultIndex = 0, onIndexChange, turnEvery = null, className } = props;
  const ref = useRef<HTMLElement>(null);
  const state = useCarousel({ count: slides.length, index, defaultIndex, onIndexChange, turnEvery, ref });

  return (
    <Box
      ref={ref}
      as="section"
      aria-roledescription={CAROUSEL_STRINGS.carousel}
      aria-label={label}
      className={['carousel', className].filter(Boolean).join(' ')}
      {...state.hold}
    >
      <Box className="carousel__viewport" aria-live={state.turning ? 'off' : 'polite'}>
        {slides.map((slide, i) => (
          <Box
            key={slide.id}
            role="group"
            aria-roledescription={CAROUSEL_STRINGS.slide}
            aria-label={CAROUSEL_STRINGS.position(i + 1, slides.length, slide.label)}
            className="carousel__slide"
            data-active={i === state.index || undefined}
            inert={i !== state.index}
          >
            {slide.content}
          </Box>
        ))}
      </Box>
      {slides.length > 1 && <CarouselBar slides={slides} state={state} />}
    </Box>
  );
};

export { Carousel };
