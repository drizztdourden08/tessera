/* @layer stories @kind component */
import { Box, Flex, Text } from '../../../../src/primitives';
import { ratingLabel } from '../behavior/rating-label';
import { starFill } from '../behavior/star-fill';
import type { RatingShowProps } from '../Rating.type';
import { RatingStar } from './RatingStar';

const RatingShow = (props: RatingShowProps) => {
  const { value, count, showValue, max, size, label, className } = props;
  const spoken = ratingLabel(value, max, count);
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  return (
    <Flex
      as="span"
      inline
      align="center"
      gap="xs"
      role="img"
      aria-label={label ? `${label}: ${spoken}` : spoken}
      className={['rating', `rating--${size}`, value === null && 'rating--none', className].filter(Boolean).join(' ')}
    >
      <Box as="span" className="rating__stars">
        {stars.map((star) => <RatingStar key={star} fill={starFill(value ?? 0, star)} size={size} />)}
      </Box>
      {showValue && value !== null && <Text as="span" className="rating__value">{value.toFixed(1)}</Text>}
      {count !== undefined && <Text as="span" className="rating__count">({count})</Text>}
    </Flex>
  );
};

export { RatingShow };
