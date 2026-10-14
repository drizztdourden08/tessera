/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { RATING_STAR_PX } from '../Rating.constants';
import type { RatingStarProps } from '../Rating.type';

const RatingStar = ({ fill, size }: RatingStarProps) => (
  <Box as="span" className="rating__star" data-fill={fill}>
    <Icon name="star" size={RATING_STAR_PX[size]} aria-hidden />
    {fill !== 'empty' && <Icon name="star" size={RATING_STAR_PX[size]} className="rating__star-fill" aria-hidden />}
  </Box>
);

export { RatingStar };
