/* @layer stories @kind component */
import { Hero } from '../../../../src/composites';
import { Button, ButtonRow, Stack, Text } from '../../../../src/primitives';
import type { StoreSample } from '../../_shared/store-sample.type';
import { STORE_SAMPLES } from '../../_shared/store-samples.constants';
import { Rating } from '../../Rating/Rating';
import { Carousel } from '../Carousel';
import type { CarouselSlide } from '../Carousel.type';
import { FEATURED_TEXT } from './carousel-story.constants';

const featuredSlide = (item: StoreSample): CarouselSlide => ({
  id: item.id,
  label: item.name,
  content: (
    <Hero
      label={item.name}
      eyebrow={FEATURED_TEXT.eyebrow}
      title={item.name}
      backdrop={{ kind: 'image', src: item.picture }}
      actions={(
        <ButtonRow>
          <Button variant="primary">{FEATURED_TEXT.install}</Button>
          <Button variant="secondary">{FEATURED_TEXT.open}</Button>
        </ButtonRow>
      )}
      aside={(
        <Stack gap="xs" align="start">
          <Rating value={item.average} count={item.count} showValue size="sm" />
          <Text as="p" variant="caption">{`${item.summary} ${FEATURED_TEXT.by(item.author)}`}</Text>
        </Stack>
      )}
    />
  ),
});

const SLIDES = STORE_SAMPLES.slice(0, 3).map(featuredSlide);

const FeaturedCarousel = ({ turnEvery = 8000 }: { turnEvery?: number | null }) => (
  <Carousel label={FEATURED_TEXT.label} slides={SLIDES} turnEvery={turnEvery} className="carousel-story__featured" />
);

export { FeaturedCarousel };
