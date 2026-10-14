/* @layer stories @kind component */
import { ItemCard, Rating } from '../../../src/composites';
import { Box, Image } from '../../../src/primitives';
import { STORE_SAMPLES } from './store-samples.constants';

const RatingCards = () => (
  <Box className="rating-story__cards">
    {STORE_SAMPLES.map((item) => (
      <ItemCard
        key={item.id}
        title={item.name}
        eyebrow={item.kind}
        media={<Image src={item.picture} alt="" aspectRatio="16 / 9" />}
        details={[`by ${item.author}`, <Rating key="rating" value={item.average} count={item.count} showValue size="sm" />]}
      />
    ))}
  </Box>
);

export { RatingCards };
