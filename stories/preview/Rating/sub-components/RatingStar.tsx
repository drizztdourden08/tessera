/* @layer stories @kind component */
import { Box, Icon } from '../../../../src/primitives';
import { RATING_STAR_PX } from '../Rating.constants';
import type { RatingStarProps } from '../Rating.type';

const RatingStar = ({ fill, size }: RatingStarProps) => (
  <Box as="span" className="rating__star" data-fill={fill}>
    <Icon name="star" size={RATING_STAR_PX[size]} className="rating__star-base" />
    {fill !== 'empty' && <Icon name="star" size={RATING_STAR_PX[size]} className="rating__star-fill" />}
  </Box>
);

export { RatingStar };
